JsonV
==========

Automatically validate the JSON data you're consuming *or* producing against given Schema(s), and *monitor* transactions for invalid data.


## tl;dr...

[setup instructions](#setup)

Ask Wilson at <a href="mailto:weisong.wang@nbcuni.com">weisong.wang@nbcuni.com</a>


## How It Works

*JsonV* to validates JSON documents against a JSON Schema in a provided github repo. Just POST your JSON documents to the endpoint provided by *JsonV* and receive validation results.

As you update your JSON Schema on github, *JsonV* will automatically sync via webhooks.


## Optional Features

- Use RabbitMQ as your endpoint (*let multiple users POST to one queue*)
- Monitor validation results with ElasticSearch


## <a name="setup"></a>Simple Setup

*Prerequisite: install go [here](https://golang.org/doc/install)*

1. Clone the repo, or: `go get github.com/nbcnews/jsonv`
2. Compile: `go install`
3. Create your configuration file ([example config files](#exampleConfig))
4. Start *JsonV* service `jsonv -conf path/to/myConfigurationFile.json`


## Use

POST your JSON documument to *Jsonv* endpoint for validation results.

To validate against multiple Schemas, place those schemas in the identified github repository, and conform to the convention of naming the Schema with a "type" key in the schema.

## <a name="exampleConfig"></a>Example Config Files

#### Basic

      {
        "jsonv": {
          "host":     "localhost:9876",  // or your webhost
          "user":     "jsonvUser",
          "password": "secret",
          "workers":  8                  // use multiple instances
        },
        "github": {
          "owner":  "accountName",
          "repo":   "repoName",
          "token":  "mytoken"            // see instructions below
        }
      }


#### With RabbitMQ and Eastic Search

      {
        "jsonv": {
          "host":     "localhost:9876",  
          "user":     "jsonvUser",
          "password": "secret",
          "workers":  8
        },
        "github": {
          "owner":  "accountName",
          "repo":   "repoName",
          "token":  "mytoken"            
        },
        "elasticsearch": {
          "host": "192.168.59.103",       // your ELK endpoint
          "index": "jsonv"
        },
        "rabbit": {
          "amqp": "amqp://user:pass@localhost:5672/",   // Rabbit endpoint
          "queue": "queueName",     
        }
      }


## <a name="githubtoken"></a>How to Generate a Github Personal Access Token

From your github account 

`settings > applications > generate web token`

Make sure the folowing options are selected

- write:repo_hook
- read:repo_hook
- admin:repo_hook


## ELK

Try this docker image for Elastic Search: [ELK docker image](https://registry.hub.docker.com/u/opiuman/elk/)
