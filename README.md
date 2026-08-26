# mcp-pipedrive

Pipedrive MCP Pack — wraps the Pipedrive REST API v1

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1476+ live data sources.

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

### What this endpoint actually serves

`tools/list` at `https://gateway.pipeworx.io/pipedrive/mcp` returns the tools in the table
above **plus the shared Pipeworx meta-tools** — `ask_pipeworx`,
`discover_tools`, `search_within`, `remember`/`recall` and the rest of the
gateway-wide set. So the tool count you see is larger than this table: a
single-pack endpoint currently lists roughly 30 shared tools alongside the
pack's own. The connection's `initialize` response states its exact scope, and
is the authoritative answer for a given day.

This is deliberate, not multiplexing by accident. The meta-tools are what let a
scoped connection answer a question this pack does not cover — via
`ask_pipeworx`, which routes across the whole catalog — without you adding a
second MCP server. There is currently no way to mount a pack endpoint without
them; if the extra schemas cost you more context than the routing is worth,
connect to the full gateway once rather than to several pack endpoints.

Or connect to the full Pipeworx gateway to get every pack's tools listed
directly, instead of just this one's:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

Both URLs reach the same gateway and the same 1476+ data sources. The
only difference is which pack's tools are listed **directly**; `ask_pipeworx`
reaches all of them from either one.

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English —
this works on the pack endpoint above as well as on the full gateway:

```
ask_pipeworx({ question: "your question about Pipedrive data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
