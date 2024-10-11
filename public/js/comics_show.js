const upvotesBtn = document.getElementById("upvotes_btn");
const downvotesBtn = document.getElementById("downvotes_btn");
const score = document.getElementById("score");

const sendVote = async (voteType) => {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if(voteType === "up") {
        options.body = JSON.stringify({
            voteType: "up",
            comicId
        });
    } else if(voteType === "down") {
        options.body = JSON.stringify({
            voteType: "down",
            comicId
        });
    } else {
        throw "voteType must be 'up' or 'down'"
    }

    await fetch("/comics/vote", options)
    .then(data => {
        return data.json();
    })
    .then(res => {
        console.log(res);
        handleVote(res.score, res.code);
    })
    .catch(err => {
        console.log(err);
    })
};

const handleVote = (newScore, code) => {
    score.innerText = newScore;

    if(code === 0) {
        upvotesBtn.classList.remove("btn-success");
        upvotesBtn.classList.add("btn-outline-success");
        downvotesBtn.classList.remove("btn-danger");
        downvotesBtn.classList.add("btn-outline-danger");
    } else if(code === 1) {
        upvotesBtn.classList.remove("btn-outline-success");
        upvotesBtn.classList.add("btn-success");
        downvotesBtn.classList.remove("btn-danger");
        downvotesBtn.classList.add("btn-outline-danger");
    } else if(code === -1) {
        upvotesBtn.classList.remove("btn-success");
        upvotesBtn.classList.add("btn-otuline-success");
        downvotesBtn.classList.remove("btn-otuline-danger");
        downvotesBtn.classList.add("btn-danger");
    } else {

    }
}

upvotesBtn.addEventListener("click", async function() {
    sendVote("up");  
});

downvotesBtn.addEventListener("click", async function() {
    sendVote("down");  
});