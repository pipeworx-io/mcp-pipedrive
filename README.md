# mcp-pipedrive

Pipedrive MCP Pack — wraps the Pipedrive REST API v1

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `pipedrive_list_deals` | View all deals in your pipeline. Returns deal IDs, titles, values, stages, and owners. Use pipedrive_get_deal for full details on a specific deal. |
| `pipedrive_get_deal` | Get complete details for a specific deal (by ID). Returns title, value, stage, probability, owner, associated contacts, and timeline. |
| `pipedrive_list_persons` | View all contacts in your CRM. Returns names, email addresses, phone numbers, and associated organizations and deals. |
| `pipedrive_get_person` | Get full contact details by ID. Returns name, emails, phones, organization, associated deals, and custom fields. |
| `pipedrive_search` | Search deals, contacts, organizations, products, or files by keyword. Returns matching records with IDs and basic info. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "pipedrive": {
      "url": "https://gateway.pipeworx.io/pipedrive/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Pipedrive data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
