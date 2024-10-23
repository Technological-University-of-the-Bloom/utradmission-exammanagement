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
- [ ] Create questions [v/t]
- [ ] Update questions [v/t]
- [ ] Delete questions [v/t]
- [ ] Get questions [v/t]
- [ ] Create answers [v/t]
- [ ] Update answers [v/t]
- [ ] Delete answers [v/t]
- [ ] Get answers [v/t]
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
### OTHER LOGIC
- [ ] Import answers [v/t]
- [ ] Import questions [v/t]


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

