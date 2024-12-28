let suscribe =
`
<div class="row justify-content-md-center py-5 px-xl-5">
    <div class="col-md-6 col-12 py-5">
        <div class="text-center mb-2 pb-2">
            <h2 class="section-title px-5 mb-3"><span class="bg-secondary px-2">Stay Updated</span></h2>
            <p>Amet lorem at rebum amet dolores. Elitr lorem dolor sed amet diam labore at justo ipsum eirmod duo labore labore.</p>
        </div>
        <form action="">
            <div class="input-group">
                <input type="text" class="form-control border-white p-4" placeholder="Email Goes Here">
                <div class="input-group-append">
                    <button class="btn btn-primary px-4">Subscribe</button>
                </div>
            </div>
        </form>
    </div>
</div>`;

function generarDivSuscribe(bodyy){
    const divSuscribe = document.createElement('div');
    divSuscribe.classList = 'container-fluid bg-secondary my-5';
    divSuscribe.id = 'show_suscribe';
    divSuscribe.innerHTML = suscribe;
    bodyy.appendChild(divSuscribe);
    //bodyy.insertBefore(divSuscribe,bodyy.children[]);    
}

export { generarDivSuscribe };