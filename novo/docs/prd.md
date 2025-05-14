Vono is a platform designed to connect musicians seeking promotion with social media users (promoters) capable of amplifying their reach. Musicians can create time-bound and budget-capped "bounties" for promoting their tracks on social media. Promoters can discover and apply for these bounties, earning rewards based on the engagement (specifically view counts) their promotional posts generate.


## 2. Goals


*   **For Musicians:** Provide an effective and measurable way to promote their music through social media engagement.
*   **For Promoters:** Offer a way to monetize their social media influence by promoting music they enjoy.
*   **For the Platform:** Create a thriving ecosystem where musicians gain visibility and promoters are rewarded for their marketing efforts.


## 3. User Roles


*   **Musician:** Users who create and fund bounties to promote their music.
*   **Promoter:** Users who apply to participate in bounties and promote music on their social media channels.
   *   *Note: A user can potentially be both a Musician and a Promoter.*


## 4. Features / User Stories


### 4.1. Core Bounty System


*   **Musician:** As a musician, I want to create a bounty for a specific track, setting a total budget cap and a deadline.
*   **Musician:** As a musician, I want to review applications from promoters and approve or reject them for my bounty.
*   **Musician:** As a musician, I want to track the performance of my active bounties, seeing total views generated and budget spent.
*   **Promoter:** As a promoter, I want to browse available bounties and apply to participate in ones that interest me.
*   **Promoter:** As a promoter, I want to submit links to my promotional posts for approved bounties.
*   **Promoter:** As a promoter, I want to see my earnings based on the verified view counts of my promotional posts.
*   **Platform:** The platform needs to verify view counts for submitted promotional posts (details TBD - potentially via API integrations or manual checks initially).
*   **Platform:** The platform needs to manage payout calculations based on views and budget caps.


### T


*   **User:** As a user (Musician or Promoter), I want to see a dashboard on the home screen summarizing the bounties I am currently hosting (if Musician) or enrolled in (if Promoter).
*   **User:** As a user, I want quick access to the status and key metrics of my active bounties from the home screen.


### 4.3. Discover Page


*   **Promoter:** As a promoter, I want to browse a list of all available bounties.
*   **Promoter:** As a promoter, I want to filter bounties by music genre/type.
*   **Promoter:** As a promoter, I want to filter/sort bounties by budget cap (e.g., highest budget).
*   **Promoter:** As a promoter, I want to filter/sort bounties by popularity (e.g., most applicants, highest engagement potential).
*   **Promoter:** As a promoter, I want to filter/sort bounties by novelty (e.g., newest bounties).


### 4.4. Notification Page


*   **User:** As a user, I want to receive notifications for important events.
*   **Promoter:** As a promoter, I want to be notified when my application for a bounty is approved or rejected.
*   **Musician:** As a musician, I want to be notified when a promoter applies to my bounty.
*   **User:** As a user, I want to be notified about payout events or issues.


### 4.5. Start Marketing (Create Bounty) Page


*   **Musician:** As a musician, I need a dedicated section or flow ("Start Marketing") to easily create a new bounty.
*   **Musician:** As a musician, when creating a bounty, I need to provide details like the track link (e.g., Spotify, Soundcloud), budget, duration, target platform(s) (e.g., TikTok, Instagram Reels), and any specific promotional guidelines.


### 4.6. Profile Page


*   **User:** As a user, I want to view and edit my profile information.
*   **User:** As a user, I want to change my display name.
*   **User:** As a user, I want to write or edit a short bio.
*   **User:** As a user, I want to change my unique username.
*   **User:** As a user, I want to connect/disconnect my social media accounts (e.g., TikTok, Instagram, Twitter) to potentially facilitate post verification and showcase my reach.
*   **User:** As a user, I want to manage my payout information (details TBD - e.g., PayPal, Stripe Connect).


## 5. Non-Functional Requirements


*   **Usability:** The platform should be intuitive and easy to navigate for both musicians and promoters.
*   **Scalability:** The platform should be able to handle a growing number of users, bounties, and social media interactions.
*   **Security:** User data, financial information, and social media connections must be kept secure.
*   **Reliability:** The platform should be available and performant. View tracking and payout calculations must be accurate.


## 6. Future Considerations / Open Questions


*   How will view counts be reliably and accurately tracked across different social media platforms? (API integrations, manual verification, promoter screenshots?)
*   What are the specific mechanisms for payout processing?
*   Detailed dispute resolution process (e.g., if a musician disputes promoter performance or vice-versa).
*   Advanced analytics for musicians beyond just view counts.
*   Gamification elements for promoters (leaderboards, badges).
*   Mobile application (iOS/Android).
*   Direct messaging between musicians and promoters.
*   Integration with music distribution platforms.



