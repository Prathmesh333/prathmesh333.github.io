# Frontend-only demos

The portfolio does not run project backends. Existing hosted projects open their own public site. A concept preview is not presented as extracted project code.

## Imported sources

| Demo | Original source | Revision | Included |
| --- | --- | --- | --- |
| Neural Consensus Engine | https://github.com/Prathmesh333/Neural-Consensus-Engine | 2f62699714531abbf09d3adba3f6c000971610e7 | React interface, graph, settings, and session history; local illustrative response adapter |
| TRACE | https://github.com/Prathmesh333/TRACE_Transparent_Results_and_Academic_Compliance_Engine | 26177ebf5b223c27f38fd98726509334d604024c | Original dashboard, schools, school details, and resources components; local sample records |

Both demos have a `connect-src 'none'` content security policy. No backend fetches, API keys, model calls, or user uploads are needed. Demo bundles load only when opened. Neural Consensus history remains in memory and resets on restart. TRACE does not include login, grading, camera, or student-management flows.

## Rebuild

Run `npm ci --ignore-scripts` followed by `npm run build` in each folder under `demos/`. Their output goes to `public/demos/`. Then run the root `npm run build`. Keep the resulting static bundles with the portfolio so ordinary portfolio builds do not need each project's dependencies.

## Limits

Only the two entries above currently use extracted original components. Other previews remain labeled concept illustrations. Python/Gradio/Streamlit, Android, notebook, and VS Code host-dependent projects cannot be converted to standalone browser applications simply by copying files. Additional frontends need individual review and sample-data adapters before they can be labeled source demos.

The provided resume is copied unchanged to `public/resume/resume.pdf`; profile content was reconciled against the copy supplied on 10 September 2026.
