from main import execute
import json


def errorResponses(responseType, message=''):
    if responseType == 'success':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            },
            'body': json.dumps({"status": "success"})
        }
    elif responseType == 'error':
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            },
            'body': json.dumps({"status": "error", "error": str(message)})
        }
    elif responseType == 'notAllowed':
        return {
            'statusCode': 405,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            },
            'body': json.dumps({"status": "error", "error": 'Method not allowed'})
        }


def handler():
    try:
        print("executing function")
        print("this works!")
        if execute() == 'error':
            return errorResponses('error', str(e))
        else:
            return errorResponses('success')

    except Exception as e:
        print("ERROR: ", e)
        return errorResponses('error', str(e))

if __name__=='__main__':
    handler()