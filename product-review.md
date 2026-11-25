# TwinCAT MCP Server pre-release review

The landing page is a stakeholder prototype. The marketing copy, engineering examples and commercial flow require approval before publication. The Qubernetic documentation endpoint returned HTTP 403 in this environment. The draft is based on the supplied brief and needs an independent review against ekvip's actual implementation.

| Owner | Claims and decisions to verify |
| --- | --- |
| Product | Product name, release status, commercial availability, target users, feature scope and stated engineering benefits. |
| Engineering | TwinCAT 3 and Windows compatibility, exact versions and architectures, engineering workstation prerequisites, installation permissions, local MSI and configuration steps. |
| Engineering | Structured Text read, create and modify operations for programs, function blocks, methods, interfaces and data types. Confirm which project structure, artifact and dependency information is exposed. |
| Engineering | Syntax validation, compilation, diagnostic retrieval, suggested fixes, library inspection and changes, PLC task configuration, program assignments, I/O topology and variable mapping. Confirm what works and under which restrictions. |
| Engineering | ADS test-runtime connectivity and supported diagnostic reads. Confirm each demo and example outcome, including conveyor state analysis, reusable function-block drafting, compilation assistance, documentation drafting, library summaries and runtime snapshots. |
| Engineering | MCP transport, client setup and tested versions of Claude Code, GitHub Copilot CLI, Cursor, OpenAI Codex and any other clients. Verify behavior and data flows for each supported configuration. |
| Engineering and privacy | Boundaries between local processing and remote AI processing, data handled by each component, access requirements, logging, evaluation guidance and qualified engineering review. |
| Sales and legal | Price, currency, sales regions, tax, license type and duration, activation, included features, updates, support, third-party subscription treatment, refunds, purchase terms, contact and company invoices. The prototype displays €9 per month or €90 per year. Confirm renewal and cancellation terms and how taxes are displayed. |
| Commerce | Embedded provider availability and payment methods, required billing fields, secure checkout, account-free ordering, timing of MSI availability, receipt and recovery email, and customer support for failed delivery. |
| Web | Approved assets, shared navigation and footer integration, routing, locale list and German translation, and final installation guide and purchasing contact links. |

## Before live payment

- Integrate Stripe-hosted payment fields and confirm accessibility, mobile support, bank authentication and return flows, tax and invoice handling.
- Compute the actual payable total on the server. Confirm payment server-side, handle duplicate provider events, and handle delayed, canceled and unsuccessful outcomes.
- Sign and test the Windows MSI. Implement authorized delivery and recovery through a receipt link. Test downloads on a different device and after expiry.
- Approve the purchase, license and privacy copy. Replace placeholder terms, contact and documentation. Review trademark usage and analytics before publishing.

## Confirmation and download authorization

The popup and expandable checkout previews share a form and an in-page confirmation. Their simulated order state lasts until reload, and their download and email actions only display test confirmations. This browser state provides no authorization. In production, return to confirmation with an opaque order reference and retrieve the order status server-side. Use verified Stripe payment events and reconciled payment status to grant an entitlement for the matching order. Check that entitlement again for each download or recovery request, and issue only short-lived authorized installer links. Never use query parameters, browser storage or the return redirect as evidence of payment. Keep the MSI private, protect email recovery with rate limits and a generic response, and only confirm receipt delivery after the email provider reports delivery. Supply the approved support address and final quick-start guide before release.

The standalone confirmation page remains a prior prototype and is outside the active purchase flow.
