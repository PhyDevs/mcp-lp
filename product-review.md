# TwinCAT MCP Server pre-release review

The landing page is a stakeholder prototype. The marketing copy, engineering examples and download flow require approval before publication. The Qubernetic documentation endpoint returned HTTP 403 in this environment. The draft is based on the supplied brief and needs an independent review against ekvip's actual implementation.

| Owner | Claims and decisions to verify |
| --- | --- |
| Product | Product name, release status, distribution terms, target users, feature scope and stated engineering benefits. |
| Engineering | TwinCAT 3 and Windows compatibility, exact versions and architectures, engineering workstation prerequisites, installation permissions, local MSI and configuration steps. |
| Engineering | Structured Text read, create and modify operations for programs, function blocks, methods, interfaces and data types. Confirm which project structure, artifact and dependency information is exposed. |
| Engineering | Syntax validation, compilation, diagnostic retrieval, suggested fixes, library inspection and changes, PLC task configuration, program assignments, I/O topology and variable mapping. Confirm what works and under which restrictions. |
| Engineering | ADS test-runtime connectivity and supported diagnostic reads. Confirm each demo and example outcome, including conveyor state analysis, reusable function-block drafting, compilation assistance, documentation drafting, library summaries and runtime snapshots. |
| Engineering | MCP transport, client setup and tested versions of Claude Code, GitHub Copilot CLI, Cursor, OpenAI Codex and any other clients. Verify behavior and data flows for each supported configuration. |
| Engineering and privacy | Boundaries between local processing and remote AI processing, data handled by each component, access requirements, logging, evaluation guidance and qualified engineering review. |
| Product and legal | Applicable software license, permitted distribution, included features, updates, support, and any third-party AI subscription requirements. |
| Web | Approved assets, shared navigation and footer integration, locale list and German translation, and final installation and configuration guide links. |

## Before publishing the download

- Supply the approved, signed Windows MSI. Verify the signature, supported architectures, direct download URL and installation on the supported Windows versions.
- Connect the hero, floating bar and final CTA to the same installer URL and keep the download status accurate. The current prototype simulates the request and delivers no file.
- Confirm the software license, compatibility matrix, detailed installation and client configuration links, and official support contact.
- Confirm that the YouTube video is embeddable on the production site and verify captions.
- The current repository has an English product page. Its German navigation goes to the corporate German site. Integrate the approved German translation in the corporate localization setup.
- Retain the former confirmation URL as a redirect to the product page for old links.
