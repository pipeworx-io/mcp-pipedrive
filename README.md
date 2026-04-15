# mcp-pipedrive

Pipedrive MCP Pack — wraps the Pipedrive REST API v1

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `pipedrive_list_deals` | List deals from Pipedrive CRM. |
| `pipedrive_get_deal` | Get a single deal by ID from Pipedrive. |
| `pipedrive_list_persons` | List persons (contacts) from Pipedrive. |
| `pipedrive_get_person` | Get a single person (contact) by ID from Pipedrive. |
| `pipedrive_search` | Search across deals, persons, organizations, products, or files in Pipedrive. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "pipedrive": {
      "url": "https://gateway.pipeworx.io/pipedrive/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use pipedrive
```

## License

MIT
