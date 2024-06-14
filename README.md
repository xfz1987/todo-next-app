# Nextjs14 + Prisma + MongoDB

## Create a nextjs app

- bun create-next-app@latest

## Use prisma to connect mongoDB

- 1. bun add prisma -D
- 2. bun add @prisma/client
- 3. bunx prisma init
- 4. Edit the schema.prisma and re-define schema model

```javascript
// this is mongoose's schema
const Schema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		isCompleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

// We do not need the schema file above. let's edit the file named "prisma/schema.prisma"

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb" // here
  url      = env("DATABASE_URL")
}

// Define the table model
model Todo {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String
  isCompleted Boolean? @default(false)
}

```

- 5. Modify .env

```js
DATABASE_URL = 'mongodb+srv://<username>:<password>@cluster0.ugofsmz.mongodb.net/<DatabaseName>';
```

- 6. Generate the Prisma Client
- - bunx prisma generate
