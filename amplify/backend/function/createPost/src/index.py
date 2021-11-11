    # "locationName" : "Test",
import boto3

# TODO
# 1. Add variable for _lastChangedAt, createdAt, and updatedAt via switfUI or here
# 2. Update schema to add a variable for "resToPeeeqReq"

def handler(event, context):

  print(event)

  dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
  table = dynamodb.Table('Post-mlqiqzw7c5gadief5jrwqkcpba-dev')

  PutItemInput = {
        'id': "Test" ,   #str(uuid.uuid4())
        'locationName': "TestLocation" ,
        'imagekey': '',
        'author': 'Test User' ,
        'comment': "" ,
    #    '__typename':{'S': event['source']['__typename']},  #event['source']['__typename']
        # '_version':{'S': event['source']['_version']},  #str(event['source']['_version'])
        # 'createdAt':{'S': event['source']['createdAt']},  #event['source']['createdAt']
        # 'updatedAt' :{'S': event['source']['createdAt']} #event['source']['updatedAt']
      #'ConditionExpression': "attribute_not_exists(id)" # ... Anything else to pass through to `putItem`, eg ConditionExpression
  }

  response = table.put_item(Item=PutItemInput)

  print('received response:')
  print(response)
  #print(context)
  #print(event['info']['selectionSetList'])
  return {
    "id" :1,
     "imagekey": "Test",
    # "author": "Test",
    # "comment" : "Test",
    # "locationName" : "Test",
    # "lat" : 1.1,
    # "long" : 1.1,
    # "_version": 1,
    # "_lastChangedAt": 1621736390723,
    # "createdAt": 1621736390723,
    # "updatedAt": 1621736390723
  }
