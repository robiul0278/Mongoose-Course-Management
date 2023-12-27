# Review Course Assignment 

## How to run this application locally

Step 1: Create a env file like this in root directory

```
NODE_ENV= development
PORT = 5000
DATABASE_URL = your database url

```

Endpoints:

1. Create a Course
* Endpoint: /api/course
* Method: POST
```
{
    "title": "New Web Course",
    "instructor": "Jane Doe",
    "categoryId": "123456789012345678901234",
    "price": 49.99,
    "tags": [
        {
            "name": "Programming",
            "isDeleted": false
        },
        {
            "name": "Web Development",
            "isDeleted": false
        }
    ],
    "startDate": "2023-01-15",
    "endDate":"2023-03-14",
    "language": "English",
    "provider": "Tech Academy",
    "details": {
        "level": "Intermediate",
        "description": "Detailed description of the course"
    }
}
```

2. Get Paginated and Filtered Courses.
* Endpoint: /api/courses
* Method: GET

filtering and pagination, such as:
```
/api/courses?page=1&pageSize=3 to retrieve the first 3 courses.
/api/courses?language=English to filter courses by language
```

3. Create a Category
* Endpoint: /api/categories
* Method: POST

Create:
```
{
    "name": "Programming"
}
```

4. Get All Categories
* Endpoint: /api/categories
* Method: GET


5. Create a Review
* Endpoint: /api/reviews
* Method: POST

```
{
    "courseId": "123456789012345678901234",
    "rating": 4,
    "review": "Great course!"
}
```

6. Update a Course (Partial Update with Dynamic Update)**
* Endpoint: /api/courses/:courseId
* Method: PUT
* Updating Both Primitive and Non-Primitive Data
* update or deleting tags

Change and Update any Field:
```
{
    "title": "Updated Title",
    "instructor": "New Instructor",
    "categoryId": "123456789012345678901234",
    "price": 59.99,
    "tags": [
        {
            "name": "Programming",
            "isDeleted": true
        },
        {
            "name": "Web Development",
            "isDeleted": false
        }
    ],
    "startDate": "2023-02-01",
    "endDate":"2023-03-14",
    "language": "Spanish",
    "provider": "Code Masters",
    "durationInWeeks": 6,
    "details": {
        "level": "Intermediate",
        "description": "Detailed description of the course"
    }
}
```

7. Get Course by ID with Reviews**
* Endpoint: /api/courses/:courseId/reviews
* Method: GET


8. Get the Best Course Based on Average Review (Rating)****

* Endpoint: /api/course/best
* Method: GET
* Response: The response includes details about the course, its average rating, and the total number of reviews

Thanks...