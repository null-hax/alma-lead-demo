# **Functional Requirements**

Develop a frontend application to support creating, getting, and updating leads using Next.js. The application should have the following features:

1. **Public Lead Form**
    - A form **PUBLICLY** available for prospects to fill in, with the following required fields:
        - First Name
        - Last Name
        - Email
        - Linkedin
        - Visas that you’re interested
        - Resume / CV (file upload)
        - Open long input
    - Upon submission, display a confirmation message to the prospect.    
    
2. **Internal Leads List UI**
    - An internal UI guarded by authentication to display a list of leads with all the information filled in by the prospect.
    - Each lead should have a state that starts as **`PENDING`** and can be manually transitioned to **`REACHED_OUT`** by an internal user.
    - Include a button to change the state of a lead from **`PENDING`** to **`REACHED_OUT`**.

## **Tech Requirements**

- Use Next.js to implement the application.
- Mock the API endpoints if necessary (Bonus: implement API routes using Next.js API).
- Implement a mock authentication mechanism to protect the internal leads list UI.
- Implement file upload for the resume/CV.
- Implement form validation to ensure all required fields are filled in correctly.
- Style the application using CSS or a CSS-in-JS library (e.g., styled-components).
- The submission should match as close as possible to the mocks.

## **Submission Guidance**

- Submit your code to a publicly available GitHub repo.
- Submit a document on how to run your application locally in the same repo.
- Submit a design document on why/how you made those design choices in the same repo.
- Any additional documents that could help us understand the application better in the same repo.
- Send an email to [shuo@tryalma.ai](mailto:shuo@tryalma.ai) with the GitHub link within 24 hours since you start the exercise.

## **Bonus Points**

- Implement API routes using Next.js API
- Use [JsonForms](https://jsonforms.io/) to implement the lead form in a configuration driven way (JsonForms is a configuration driven UI component lib)
- Use a state management library (e.g., Redux) to manage the state of the leads.
- Implement unit tests for key components and functionalities.
- Add responsiveness to ensure the application works well on different screen sizes.
- Use TypeScript for type safety.
- Implement form validation feedback (e.g., show error messages when fields are not filled in correctly).
- Document the system design.

## **Tips**

- This is a full-stack engineer role with focus on **frontend** and make your own judgement calls on where you can trade off things