import * as core from '@actions/core'
import * as github from '@actions/github'
import {inspect} from 'util'

async function run() {
  try {
    const inputs = {
      token:
        core.getInput('token') === ''
          ? github.token
          : core.getInput('token'),
      owner:
        core.getInput('repo') === ''
          ? github.context.repo.owner
          : core.getInput('repo').split('/')[0],
      repo:
        core.getInput('repo') === ''
          ? github.context.repo.repo
          : core.getInput('repo').split('/')[1],
      number:
        core.getInput('number') === ''
          ? github.context.payload.pull_request.number
          : parseInt(core.getInput('number')),
      reviewers:
        core.getInput('reviewers') === ''
          ? []
          : core.getInput('reviewers').split(','),
      team_reviewers:
        core.getInput('team_reviewers') === ''
          ? []
          : core.getInput('team_reviewers').split(',')
    }

    const octokit = github.getOctokit(inputs.token)

    octokit.rest.pulls.requestReviewers({
      owner: inputs.owner,
      repo: inputs.repo,
      pull_number: inputs.number,
      reviewers: inputs.reviewers,
      team_reviewers: inputs.team_reviewers
    })
  } catch (error) {
    core.debug(inspect(error))
    core.setFailed(error.message)
  }
}

run()
