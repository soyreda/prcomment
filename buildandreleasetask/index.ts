import tl = require('azure-pipelines-task-lib/task');
import axios from 'axios';
async function run() {
	try {
		const token: string | undefined = tl.getInput('token', true);
		const organization: string | undefined = tl.getInput('organization', true);
		const repository: string | undefined  = tl.getInput('repository', true);
		const comment: string | undefined = tl.getInput('comment', true);
		const prId: string | undefined = tl.getInput('prId', true);
		const apiUrl: string = `https://dev.azure.com/${organization}/_apis/git/repositories/${repository}/pullrequests/${prId}/threads`
		console.log(apiUrl);

		const response = await axios.post(
			apiUrl,
			{'comments': [{'parentCommentid': 0, 'content': comment}]},
			{
				params: {'api-version': '7.0'},
				headers: {'Content-Type': 'application/json'},
				auth: {username: '', password: token}
			}
		)
		if(response) tl.setResult(tl.TaskResult.Succeeded, "Comment has been added successfully")

	}
	catch(err: any) {
		console.log("I used the old version of axios in here")
		tl.setResult(tl.TaskResult.Failed, err.message)
	}
}

run();
