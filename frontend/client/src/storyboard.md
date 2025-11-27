# PeaceLink Interaction Flow Storyboard

## 1. Youth → Platform
- Youth submits a report (incident, dispute, or community issue).
- System saves report locally if offline, syncs when online.
- Notification sent to Moderators + Elders for review.
- Youth receives confirmation + later feedback (Approved, Flagged, Trusted).

## 2. Elders → Reports & Forums
- Elders receive reports (via app or SMS/voice).
- Elders endorse reports (tagged as “Trusted”).
- Elders moderate forums: approve posts, add cultural validation.
- Endorsed reports/posts gain higher visibility in NGO dashboards.

## 3. Moderators → Content Pipeline
- Moderators review incoming reports and forum posts.
- Harmful content auto-hidden; Moderator decides final status.
- Translation workflow triggered if post/report is in another language.
- Approved content flows into Admin dashboard + NGO analytics.

## 4. NGOs/Government Actors → Analytics & Resources
- NGOs access dashboards to view verified reports, forum trends, and resource usage.
- Analytics show hotspots (e.g., cattle raiding in a region).
- NGOs upload verified peacebuilding resources (guides, training modules).
- NGOs coordinate interventions, share updates via Alerts.

## 5. Admins → Oversight & Governance
- Admins manage users, roles, and system-wide settings.
- Admins export reports for partners.
- Audit logs track moderator/elder actions.
- Alerts composed and broadcast (push, SMS, WhatsApp).
- Admin ensures compliance, transparency, and trust.

## 6. System Automations → Glue Between Users
- Offline sync: Youth/Elders can submit reports offline → auto-sync later.
- Voice-to-text: Converts elder audio reports into text for moderators.
- Auto-hide harmful posts: Keeps forums safe until reviewed.
- Notifications: Push/SMS alerts keep all users updated.
- Verification badges: Trusted partner content flagged for credibility.

## End-to-End Use Case Example
1. Youth in Bor submits a report: “Land dispute escalating near riverbank” with photo + GPS.
2. System saves report offline → syncs when online → notifies Moderator + Elder.
3. Elder reviews via voice input, endorses report as “Trusted.”
4. Moderator translates description (Arabic → English), approves, tags as verified.
5. Admin dashboard updates: “Land dispute, Bor region, Trusted.”
6. NGO actor sees analytics spike in Bor → coordinates with local peace committee.
7. NGO uploads resource: “Guide to land dispute mediation” → available in Resources library.
8. System sends alert: “Community mediation scheduled in Bor, verified by NGO partner.”
9. Youth receives notification → attends mediation → later posts forum reflection.
10. Elder endorses forum post → tagged as “Trusted story.”
11. Admin exports report + forum thread → shares with government peace office.

## Interaction Matrix
| User Role        | Reports | Forums | Resources | Alerts | Analytics | Moderation | Admin |
|------------------|---------|--------|-----------|--------|-----------|------------|-------|
| **Youth**        | Submit, track | Join, post | Access, save | Receive | — | — | — |
| **Elders**       | Voice/SMS, endorse | Moderate, endorse | Access | Receive | — | Approve/hide | — |
| **Moderators**   | Review, approve | Translate, approve | — | — | — | Full moderation | — |
| **NGOs/Gov**     | View verified | Observe trends | Upload, access | Send/receive | Full analytics | — | — |
| **Admins**       | Export | — | Manage CMS | Compose, broadcast | Full analytics | Oversee | Manage users, roles |
| **System**       | Sync, notify | Auto-hide harmful | Verify partner content | Push/SMS | Generate dashboards | Auto-flag | Log actions |

## Why this flow works
- Youth → Elders → Moderators → NGOs → Admins → System → back to Youth creates a closed feedback loop.
- Every actor adds value: Youth = voice, Elders = trust, Moderators = safety, NGOs = coordination, Admins = governance, System = automation.
- Ensures transparency, inclusivity, and resilience even in fragile contexts.
