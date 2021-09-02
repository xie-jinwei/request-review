# Request review

This GitHub action requests review on a pull request.

## Inputs

| Name | Description | Default |
| --- | --- | --- |
| `token` | `Token to use for requesting review` | ${{ github.token }} |
| `repo` | `Owner + Name of the repo to request review` | ${{ github.repository }} |
| `number` | `Number of the pull request to request review` | ${{ github.event.pull_request.number }} |
| `reviewers` | `Reviewers to add, in "," separated list` | None |
| `team_reviewers` |  `Team reviewers to add, in "," separated list` | None |

## Outputs
None


## Example

### Automatic request review on new pull requests
```YAML
name: Automatic request review on new pull requests
on: 
  pull_request:
    types: [ created ]

jobs:
  auto-request-review:
    runs-on: ubuntu-latest
    steps:
      - name: Automatic Request review
        uses: xie-jinwei/request-review@v1
        with:
          reviewers: 'jimmy,lily'

```

### Request review in a pull request in another repo
```YAML
- name: Request review
  uses: xie-jinwei/request-review@v1
  with:
    token: ${{ secrets.ACTION_BOT_TOKEN }}
    repo: xie-jinwei/request-review
    number: 11
    # Reviewers to add, in "," separated list.
    reviewers: 'tommy,amy,bob'
    # Team reviewers to add, in "," separated list.
    reviewers: 'team1,team2'
```