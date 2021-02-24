// Event Handler called when the form has been submitted. 
$("form").submit(function() {
    event.preventDefault();
    let date = $("input[name='date']").data('datepicker').getFormattedDate('yyyy-mm-dd');
    getData(date);
});

function getData(date) {
    let request_url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=' + date.toString() 
    console.log(request_url);
    fetch(request_url)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                // Examine the text in the response
                response.json().then(function (data) {
                    console.log(data);
                    console.log(data.url);
                    const name = data.title
                    const date_taken = data.date
                    const copyright = data.copyright
                    const description = data.explanation
                    const picture_url = data.url

                    document.getElementById("name").innerHTML = "Name: " + name;
                    document.getElementById("date-taken").innerHTML = "Date Taken: " + date_taken;
                    document.getElementById("copyright").innerHTML = "Copyright: " + copyright;
                    document.getElementById("description").innerHTML = "Image Description: " + description;
                    document.getElementById("picture").src = picture_url;
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function getTodayImage() {
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                // Examine the text in the response
                response.json().then(function (data) {
                    console.log(data);
                    const name = data.title
                    const date = data.date
                    const copyright = data.copyright
                    const description = data.explanation
                    const picture_url = data.url

                    document.getElementById("name").append(name);
                    document.getElementById("date").append(date);
                    document.getElementById("copyright").append(copyright);
                    document.getElementById("description").append(description);
                    document.getElementById("picture").src = picture_url;
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}