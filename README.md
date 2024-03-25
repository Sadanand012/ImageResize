# ImageResize API

This API allows users to upload images, resize them, change their quality, and convert their formats using the Sharp library. Processed images can be stored in a MongoDB database and accessed via unique identifiers.

## Tech Stack

- **Node.js**: Backend JavaScript runtime environment
- **Express.js**: Web application framework for Node.js
- **MongoDB**: NoSQL database for storing processed images
- **Mongoose**: MongoDB object modeling for Node.js
- **Sharp**: High-performance image processing library

## Installation

1. Clone the repository:

    ```
    git clone [https://github.com/your_username/image-processing-api.git](https://github.com/Sadanand012/ImageResize)
    ```

2. Install dependencies:

    ```
    cd imageResize
    npm install
    ```

3. Set up MongoDB:
   
   - Ensure MongoDB is installed and running on your system.
   - Update the MongoDB connection string in `src/index.js` if necessary.

## Usage

### Starting the Server

Start the server using the following command:

The server will run on `http://localhost:8686`.

### Endpoints

#### 1. POST /image

This endpoint allows users to upload images, resize them, change their quality, and convert their formats.

- **Method:** POST
- **URL:** `/image`
- **Parameters:**
  - `image`: Image file (form-data)
  - Query Parameters:
    - `width`: Desired width of the resized image (optional)
    - `height`: Desired height of the resized image (optional)
    - `quality`: Quality of the output image (optional, applicable for JPEG format)
    - `format`: Desired format of the output image (optional, e.g., "jpg", "png", "webp")

#### 2. GET /image/:id

This endpoint allows users to retrieve processed images stored in the MongoDB database.

- **Method:** GET
- **URL:** `/image/:id`
- **Parameters:**
  - `id`: Unique identifier of the processed image

## Examples

### Example 1: Upload and Process Image

```bash
curl -X POST -F "image=@/path/to/image.jpg" "http://localhost:8686/image?width=300&height=200&quality=80&format=png"

