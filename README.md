JsonV
==========

Make sure the JSON data you're consuming *or* producing conforms to a given Schema, and *monitor* transactions for bad data.

# tl;dr [setup](setup)


## How Does it Work

*JsonV* to validates JSON documents against a JSON Schema in a provided github repo. Just POST your JSON documents to the endpoint provided by *JsonV* and receive validation results.

## Optional

- Use RabbitMQ as your endpoint
  + allow multiple producers to post to the same queue

- Monitor validation results with ElasticSearch


## <a name="setup"></a>Simple Setup

*Prerequisite: install go [here](https://golang.org/doc/install)*

1. Clone the repo, or `go get github.com/nbcnews/jsonv`
2. Compile: `go install`
3. Create your configuration file ([example config files](exampleConfig))
4. Start *JsonV* service `jsonv -conf path/to/myConfigurationFile.json`


## <a name="exmapleConfig"></a>Example Config Files

#### Basic

      {
        "jsonv": {
          "host":     "localhost:9876",  // or your webhost
          "user":     "jsonvUser",
          "password": "secret",
          "workers":  8                  // scale the service with multiple workers
        },
        "github": {
          "owner":  "accountName",
          "repo":   "repoName",
          "token":  "mytoken"            // [instructions](githubtoken)
        }
      }


## <a name="githubtoken"></a>How to Generate a Github Personal Access Token

From your github account 

`settings > applications > generate web token`

Make sure the folowing options are selected

- write:repo_hook
- read:repo_hook
- admin:repo_hook
