# HTTP Request & Response

Understanding how the browser communicates with a server through HTTP requests and responses, and how to debug API-related problems using status codes, response data, and browser DevTools.

## 🧠 What I Learned

HTTP is a communication protocol that allows the browser (client) and server to communicate.

The basic flow is:

```text
Browser
   ↓
HTTP Request
   ↓
Server
   ↓
HTTP Response
   ↓
Browser
```

An HTTP Request contains information such as:

```text
Request
├── Method
├── URL
├── Headers
└── Body
```

An HTTP Response contains:

```text
Response
├── Status Code
├── Headers
└── Body
```

### HTTP Methods

HTTP methods describe the type of operation the client wants to perform.

Common methods include:

* `GET` → Retrieve data
* `POST` → Create new data
* `PUT` → Replace or update a resource
* `PATCH` → Partially update a resource
* `DELETE` → Delete a resource

For example:

```js
fetch("/api/products");
```

By default, `fetch()` sends a `GET` request.

### URL

The URL specifies where the request should be sent.

For example:

```text
https://example.com/api/products
```

If the requested resource does not exist, the server may return:

```text
404 Not Found
```

### Headers

Headers contain additional information about the Request or Response.

For example:

```text
Content-Type: application/json
```

Another example is:

```text
Authorization: Bearer token
```

Headers can provide information about the data format, authentication, caching, and other request or response details.

### Body

The Body can contain data sent with a Request or returned in a Response.

For example:

```js
fetch("/api/products", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Laptop",
    price: 1000
  })
});
```

---

## 📥 HTTP Response

After receiving a Request, the server sends a Response back to the browser.

A Response contains:

```text
Response
├── Status Code
├── Headers
└── Body
```

The Status Code is especially useful when debugging API requests.

### Status Codes

HTTP status codes indicate the result of a request.

#### 2xx — Success

The request was successfully processed.

```text
200 OK
201 Created
204 No Content
```

#### 3xx — Redirection

The client needs to follow a redirect or use cached information.

```text
301 Moved Permanently
302 Found
304 Not Modified
```

#### 4xx — Client / Request Error

There is a problem with the request or the client's access.

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
```

`404 Not Found` means that the requested resource could not be found.

#### 5xx — Server Error

The server encountered a problem while processing the request.

```text
500 Internal Server Error
502 Bad Gateway
503 Service Unavailable
```

---

## ⚡ Fetch

JavaScript provides the `fetch()` API for making HTTP requests.

For example:

```js
const response = await fetch("/api/products");
```

The returned value is a `Response` object.

If the response contains JSON data, it can be read using:

```js
const data = await response.json();
```

---

## ⚠️ `response.ok`

One important concept I learned is that `fetch()` does not automatically reject when the server returns HTTP errors such as `404` or `500`.

For example:

```js
const response = await fetch("/api/products");

if (response.ok) {
  const data = await response.json();

  // Use data
} else {
  console.log(response.status);
}
```

`response.ok` is `true` when the HTTP status is in the `200–299` range.

For example:

```text
200 → response.ok === true
404 → response.ok === false
500 → response.ok === false
```

This means HTTP errors should be handled explicitly.

---

## 🔍 Debugging

The problem was investigated using:

**Chrome DevTools → Network**

The Network panel can be used to inspect HTTP requests and responses.

A request can provide information such as:

```text
Request
├── URL
├── Method
├── Headers
├── Payload
└── Timing
```

And the response can be inspected through:

```text
Status
Headers
Preview
Response
```

This makes it possible to determine whether the problem is related to the request, the server, or the returned data.

---

## 🐛 Main Problem

The debugging exercise intentionally requested a resource that did not exist:

```js
const response = await fetch(
  "https://jsonplaceholder.typicode.com/posts/999999"
);
```

The browser successfully sent the request, but the server returned:

```text
404 Not Found
```

The response was then parsed:

```js
const data = await response.json();
```

The returned data was an empty object:

```js
{}
```

The code then attempted to use:

```js
data.forEach((product) => {
  // ...
});
```

This caused:

```text
TypeError: data.forEach is not a function
```

The problem was not simply `forEach`.

The actual problem started earlier:

```text
Invalid Resource
       ↓
404 Not Found
       ↓
Response Body
       ↓
data = {}
       ↓
data.forEach()
       ↓
TypeError
```

The solution was to check the HTTP response before processing the data:

```js
if (response.ok) {
  const data = await response.json();

  // Process data
} else {
  console.log(response.status);
}
```

---

## 🧠 Debugging Mindset

When an API does not work, don't immediately assume that the problem is in the UI or framework.

Instead, follow the request step by step:

```text
UI
 ↓
fetch()
 ↓
Request
 ↓
Server
 ↓
Response
 ↓
Status Code
 ↓
Response Body
 ↓
Parse Data
 ↓
Application Logic
 ↓
UI
```

If an error such as:

```text
data.forEach is not a function
```

appears, check the earlier steps before changing the code.

Important questions to ask:

* Was the request sent?
* Is the URL correct?
* What is the HTTP status?
* What did the server return?
* What type of data was returned?
* Does the returned data match what the code expects?

---

## 💡 Key Takeaways

* HTTP is a communication protocol between clients and servers.
* A Request is sent from the browser to the server.
* A Response is returned from the server to the browser.
* HTTP methods describe the intended operation.
* Headers provide additional information about a Request or Response.
* The Body can contain data sent or returned by the server.
* Status Codes describe the result of an HTTP request.
* `404` means the requested resource was not found.
* `response.ok` can be used to check whether an HTTP response was successful.
* `fetch()` does not automatically reject for HTTP errors such as `404` or `500`.
* `response.json()` reads and parses a JSON response body.
* The returned data should match the structure that the application expects.
* Chrome DevTools Network can help identify API and HTTP problems.
* When debugging an API, trace the problem from the Request to the Response instead of only looking at the final JavaScript error.

## 🔗 Related Concepts

* HTTP Methods
* HTTP Status Codes
* Request Headers
* Response Headers
* Request Body
* Response Body
* REST API
* JSON
* Fetch API
* Network Debugging
* CORS
* Authentication
* Cookies
* HTTP Caching
* API Error Handling
