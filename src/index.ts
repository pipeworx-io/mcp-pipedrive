interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * Pipedrive MCP Pack — wraps the Pipedrive REST API v1
 *
 * BYO key: _apiKey (passed as api_token query parameter).
 * Tools: list/get deals, list/get persons, search.
 */


const API = 'https://api.pipedrive.com/v1';

async function pdFetch(apiKey: string, path: string): Promise<unknown> {
  const separator = path.includes('?') ? '&' : '?';
  const url = `${API}${path}${separator}api_token=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pipedrive API error (${res.status}): ${text}`);
  }
  return res.json();
}

const tools: McpToolExport['tools'] = [
  {
    name: 'pipedrive_list_deals',
    description: 'List deals from Pipedrive CRM.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        _apiKey: { type: 'string', description: 'Pipedrive API token' },
        status: { type: 'string', description: 'Filter by status: open, won, lost, deleted, all_not_deleted (default: all_not_deleted)' },
        start: { type: 'number', description: 'Pagination start (default 0)' },
        limit: { type: 'number', description: 'Number of results (max 500, default 50)' },
      },
      required: ['_apiKey'],
    },
  },
  {
    name: 'pipedrive_get_deal',
    description: 'Get a single deal by ID from Pipedrive.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        _apiKey: { type: 'string', description: 'Pipedrive API token' },
        id: { type: 'number', description: 'Deal ID' },
      },
      required: ['_apiKey', 'id'],
    },
  },
  {
    name: 'pipedrive_list_persons',
    description: 'List persons (contacts) from Pipedrive.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        _apiKey: { type: 'string', description: 'Pipedrive API token' },
        start: { type: 'number', description: 'Pagination start (default 0)' },
        limit: { type: 'number', description: 'Number of results (max 500, default 50)' },
      },
      required: ['_apiKey'],
    },
  },
  {
    name: 'pipedrive_get_person',
    description: 'Get a single person (contact) by ID from Pipedrive.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        _apiKey: { type: 'string', description: 'Pipedrive API token' },
        id: { type: 'number', description: 'Person ID' },
      },
      required: ['_apiKey', 'id'],
    },
  },
  {
    name: 'pipedrive_search',
    description: 'Search across deals, persons, organizations, products, or files in Pipedrive.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        _apiKey: { type: 'string', description: 'Pipedrive API token' },
        term: { type: 'string', description: 'Search term' },
        item_types: { type: 'string', description: 'Comma-separated item types to search: deal, person, organization, product, file (default: all)' },
        limit: { type: 'number', description: 'Max results (default 50)' },
      },
      required: ['_apiKey', 'term'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  const apiKey = args._apiKey as string;

  switch (name) {
    case 'pipedrive_list_deals': {
      const status = (args.status as string) ?? 'all_not_deleted';
      const start = (args.start as number) ?? 0;
      const limit = (args.limit as number) ?? 50;
      return pdFetch(apiKey, `/deals?status=${status}&start=${start}&limit=${limit}`);
    }

    case 'pipedrive_get_deal': {
      const id = args.id as number;
      return pdFetch(apiKey, `/deals/${id}`);
    }

    case 'pipedrive_list_persons': {
      const start = (args.start as number) ?? 0;
      const limit = (args.limit as number) ?? 50;
      return pdFetch(apiKey, `/persons?start=${start}&limit=${limit}`);
    }

    case 'pipedrive_get_person': {
      const id = args.id as number;
      return pdFetch(apiKey, `/persons/${id}`);
    }

    case 'pipedrive_search': {
      const term = encodeURIComponent(args.term as string);
      const limit = (args.limit as number) ?? 50;
      let path = `/itemSearch?term=${term}&limit=${limit}`;
      if (args.item_types) {
        path += `&item_types=${args.item_types as string}`;
      }
      return pdFetch(apiKey, path);
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export default { tools, callTool, meter: { credits: 10 } } satisfies McpToolExport;
