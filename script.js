window.addEventListener("load", () => {
    const canvas = document.getElementById("board");
    const ctx = canvas.getContext("2d");
    const sendButton = document.getElementById("send") 
    const clearButton = document.getElementById("clear") 
    const result = document.getElementById("result") 
    let isDrawing = false;

    canvas.addEventListener("mousedown", e => {
        isDrawing = true;
        ctx.lineWidth = 12;
        ctx.moveTo(
            e.clientX - canvas.offsetLeft,
            e.clientY - canvas.offsetTop
        )
    });

    canvas.addEventListener("mousemove", e => {
        if (isDrawing){
            ctx.lineTo(
                e.clientX - canvas.offsetLeft,
                e.clientY - canvas.offsetTop
            );
            ctx.stroke();
        };
    });

    canvas.addEventListener("mouseup", e => {
        isDrawing = false;
    });

    function getImage(){
        const dataUrl = canvas.toDataURL();
        return dataUrl;
    }

    sendButton.addEventListener("click", async() => {
        const dataBase64 = getImage()

        await fetch(
            "http://127.0.0.1:2940/predict",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ data: dataBase64 })
            }
        ).then(res => res.json())
        .then(data => {
            console.log(data)
            result.innerText = data.data
        })
    })

    clearButton.addEventListener("click", () => {
        ctx.beginPath();
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.restore();

        result.innerText = ""
    })

})