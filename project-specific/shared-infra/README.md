# How project was setup
The files used to setup this project were copied from the [template-files](https://github.com/lincolnnguyen18/template-files) repository.

Run the following commands:
```bash
# Initialize cdktf project
cdktf init --template=typescript --local \
--project-name=infra \
--project-description="Shared infrastructure for lincolnnguyen.me" \
--from-terraform-project=false \
--enable-crash-reporting=true \
--providers=\
hashicorp/aws \
hetznercloud/hcloud

# Install other dependencies
npm i \
dotenv \
tsconfig-paths \
eslint \
@typescript-eslint/eslint-plugin \
@typescript-eslint/parser
```

Delete the following files:
* main.ts
* tsconfig.json
* jest.config.js
* .gitignore

Copy the following files to the root directory:
* .env
* .eslintrc
* .eslintignore
* .gitignore
* jest.config.js
* tsconfig.json

Delete the following folders:
* \_\_tests\_\_

Copy the following folders to the root directory:
* src
* .github

In `cdktf.json`, change
```json
"app": "npx ts-node main.ts"
```
to
```json
"app": "npx ts-node src/main.ts"
```

In `package.json`, add the following script:
```json
"lint": "eslint ."
```

Then,
* Run Jest: Setup Extension in VSCode
* Initialize the git repository
* Publish to GitHub
* Set PAT secret in GitHub repository settings
* Create SSH key named default-rsa in Hetzner Cloud

# Commands
```bash
# Running cdktf commands for dev environment
cdktf diff
# Running cdktf commands for a specific environment
TARGET_ENV=staging cdktf diff
```