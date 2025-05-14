# Vono - Development Plan


This document outlines a phased approach to developing the Vono music promotion platform, based on the requirements specified in `prd.md`.


## Phase 1: Core MVP - Establishing the Foundation


**Goal:** Build the essential functionality for musicians to create bounties and promoters to apply and submit work. Focus on manual processes for verification and payout initially.


**Tasks:**


1.  **Project Setup:**
   *   Initialize codebase repository.
   *   Set up development environment (e.g., framework choice, database).
   *   Basic CI/CD pipeline.
2.  **User Authentication & Basic Profiles:**
   *   Implement user registration and login.
   *   Database schema for Users (ID, name, username, email, password hash, role - Musician/Promoter).
   *   Basic Profile Page: View/edit name, username, bio.
3.  **Bounty Creation (Musician):**
   *   Database schema for Bounties (ID, musician\_id, track\_link, budget, deadline, description, status).
   *   "Start Marketing" Page: Form to create a new bounty.
   *   Backend logic to save new bounties.
4.  **Bounty Discovery (Promoter - Basic):**
   *   Simple Discover Page: List all active bounties (no filtering/sorting yet).
   *   Display basic bounty details (musician, track info hint, budget, deadline).
5.  **Bounty Application & Approval:**
   *   Database schema for Applications (ID, bounty\_id, promoter\_id, status - pending/approved/rejected).
   *   Promoter: Ability to apply to a bounty from the Discover page.
   *   Musician: View list of applicants for their bounty.
   *   Musician: Ability to approve/reject applications.
6.  **Promotional Post Submission (Promoter):**
   *   Database schema for Posts (ID, application\_id, post\_link, submission\_time, view\_count - manual entry initially).
   *   Promoter: Ability to submit a link to their promotional post for an approved bounty.
7.  **Home Screen (Basic):**
   *   Display lists of bounties the user is hosting (Musician) or enrolled in (Promoter).
   *   Show basic status (e.g., active, pending applications, submitted posts).
8.  **Basic Admin/Manual Overrides:**
   *   Mechanism for admins (initially developers) to manually update view counts and mark bounties for payout.


## Phase 2: Enhancements & Core Loop Refinement


**Goal:** Improve usability, add essential filters, implement notifications, and refine the core workflow.


**Tasks:**


1.  **Discover Page Enhancements:**
   *   Implement backend filtering logic (genre - needs genre field in Bounties, budget).
   *   Implement backend sorting logic (novelty, budget).
   *   Update Discover Page UI with filter/sort controls.
2.  **Profile Page Enhancements:**
   *   Implement Social Media Connection (OAuth for 1-2 key platforms initially, e.g., TikTok). Store tokens securely.
   *   Add section for Payout Information (initially just text fields for manual processing, e.g., PayPal email).
3.  **Notification System (Basic):**
   *   Database schema for Notifications (ID, user\_id, message, timestamp, read\_status).
   *   Generate in-app notifications for:
       *   Promoter: Application approved/rejected.
       *   Musician: New application received.
   *   Notification Page: Display list of user's notifications.
4.  **Improved Bounty Tracking & Management:**
   *   Musician View: Display submitted post links for their bounties. Add field for manually inputting verified view counts.
   *   Promoter View: Show status of submitted posts (pending verification, verified).
5.  **Refined Payout Logic (Manual Trigger):**
   *   Develop logic to calculate potential promoter earnings based on manually entered view counts vs. budget cap.
   *   Admin tool/process to trigger payout calculations and flag users for manual payment.
6.  **UI/UX Polish:**
   *   Refine styling and layout based on initial user feedback (if available).
   *   Improve navigation flow.


## Phase 3: Automation & Advanced Features


**Goal:** Automate key processes like view tracking and payouts, add advanced discovery features.


**Tasks:**


1.  **View Count Verification:**
   *   Research/Implement API integrations with social platforms (e.g., TikTok API) to fetch view counts automatically. *This is complex and may require significant effort/adaptation.*
   *   Develop fallback mechanisms (e.g., requiring screenshots, robust manual verification workflow).
   *   Update Post schema and related logic to handle automated/verified view counts.
2.  **Automated Payouts:**
   *   Integrate with a payment provider (e.g., Stripe Connect, PayPal Payouts API).
   *   Implement secure flow for collecting and managing payout details.
   *   Automate payout calculations and execution based on verified views and budget limits.
   *   Handle payout failures and reporting.
3.  **Discover Page - Popularity Filter:**
   *   Track application counts or other engagement metrics per bounty.
   *   Implement popularity sorting/filtering based on tracked metrics.
4.  **Notification System Enhancements:**
   *   Notifications for payout events.
   *   (Optional) Email or push notification integration.
5.  **Dashboard Enhancements:**
   *   Musician Dashboard: More detailed analytics (total views, spend rate, top promoters).
   *   Promoter Dashboard: Clear earnings breakdown per bounty, total earnings.


## Phase 4: Future Considerations (Post-MVP / V2+)


**Goal:** Expand platform capabilities based on user feedback and market opportunities.


**Tasks (Selection based on priority):**


*   **Mobile Applications:** Develop native iOS/Android apps.
*   **Direct Messaging:** Allow communication between musicians and promoters within the platform.
*   **Dispute Resolution System:** Formal process for handling disagreements.
*   **Gamification:** Leaderboards, badges for promoters.
*   **Advanced Analytics:** Deeper insights for musicians.
*   **Integration with Music Distribution Platforms:** Streamline track import for musicians.
*   **Advanced Bounty Options:** Tiered rewards, specific target demographics, etc.


## Non-Functional Requirements (Ongoing)


*   **Scalability:** Design database schemas and infrastructure for growth. Monitor performance under load.
*   **Security:** Implement security best practices (input validation, authentication, authorization, dependency scanning, secure API key management). Conduct security reviews/audits, especially before launching payment features.
*   **Usability:** Conduct user testing throughout development. Iterate on UI/UX based on feedback.
*   **Reliability:** Implement comprehensive testing (unit, integration, end-to-end). Set up monitoring and alerting for production environment. Ensure accurate tracking and calculations.


This plan provides a roadmap. Priorities and tasks within phases may be adjusted based on development progress, resource availability, and user feedback.
