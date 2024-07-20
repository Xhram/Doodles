/**
 * 
 * @param {JSON} data 
 * @returns {JSON}
 */

async function post(data,extraUrl) {

    return fetch(window.location.origin = "/api" + extraUrl!=undefined?"/" + extraUrl:"", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); 
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
}
/**
 * 
 * @param {json} data 
 * @returns {Promise}
 */
function postPromise(data){
    return fetch(window.location.origin = "/api", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    })
}