require('dotenv/config');
const express = require('express');
const axios = require('axios');
const uuidv4 = require('uuid/v4');

const server = express();

server.get('/resources', async function(req, res) {
    const resources = await axios({
        method: 'POST',
        url: process.env.API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.SENDER
        }, 
        data: {  
            "id": uuidv4(),
            "method": "get",
            "uri": "/resources"
        }
    });

    getByResource(resources);

    res.json('OK');
});

server.get('/delete-resource', async function(req, res) {
    const resources = await axios({
        method: 'POST',
        url: process.env.API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.SENDER
        }, 
        data: {  
            "id": uuidv4(),
            "method": "get",
            "uri": "/resources"
        }
    });

    deleteResource(resources);

    res.json('OK');
});

function getByResource(resources) {
    resources.data.resource.items.forEach(async (element) => {
        var itemResource = await axios({
            method: 'POST',
            url: process.env.API_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.SENDER
            }, 
            data: {  
                "id": uuidv4(),
                "method": "get",
                "uri": "/resources/"+element
            }
        });
        await setResource(element, itemResource.data.resource)
    });

    return true;
}

async function setResource(element, resource) {
    await axios({
        method: 'POST',
        url: process.env.API_URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.RECIPIENT
        }, 
        data: {  
            "id": uuidv4(),
            "method": "set",
            "uri": "/resources/"+element,
            "type": "text/plain",
            "resource": resource
        }
    });

    return true;
}

function deleteResource(resources) {
    resources.data.resource.items.forEach(async (element) => {
        await axios({
            method: 'POST',
            url: process.env.API_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.SENDER
            },
            data: {  
                "id": uuidv4(),
                "method": "delete",
                "uri": "/resources/"+element
            }
        });
    });

    return true;
}

server.listen(3000);