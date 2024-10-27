## Description
This module will take care of exam management operations.
It will be used for the following:
- Managing questions and answers
- Importing questions and answers
- Managing exams
- changing exam status [open/close]
- Schedule exams


## Checklist
### CRUD
- [x] Create questions [v/t]
- [x] Update questions [v/t]
- [x] Delete questions [v/t]
- [x] Get questions [v/t]
- [x] Create answers [v/t]
- [x] Update answers [v/t]
- [x] Delete answers [v/t]
- [x] Get answers [v/t]
- [x] Create exams
- [x] Update exams
- [x] Delete exams
- [x] Get exams
- [x] Update exam status
- [x] Get exam status
- [x] Create exam date
- [x] Update exam date
- [x] Get exam date
- [x] Get carrera
- [x] Create carrera
- [x] Update carrera
- [x] Delete carrera
### BUSINESS LOGIC
- [ ] Import/Export answers [v/t]
- [ ] Import/Export questions [v/t]
- [x] Update carrera_pv/pt tables when creating new questions [Questions per major]
- [ ] update pv/pt_respuestas tables when creating new answers [Answers per question]


## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

