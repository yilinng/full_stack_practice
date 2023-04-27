```mermaid
sequenceDiagram
    participant browser
    participant server

    by writing something spa into the text field and clicking the submit button

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: { "note": "writing something spa"}
    deactivate server

    Instructs the code to fetch the form element from the page and to register an event handler to handle the form's submit event. The event handler immediately calls the method e.preventDefault() to prevent the default handling of form's submit. The default method would send the data to the server and cause a new GET request.

    Then the event handler creates a new note, adds it to the notes list with the command notes.push(note), rerenders the note list on the page and sends the new note to the server.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: {content: "writing something spa", date: "2023-04-23"}
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```
