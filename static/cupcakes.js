const BASE_URL = "http://localhost:5000/api";

// helper function to generate HTML
function generateCupcakeHTML(cupcake) {
    return `
    <div data-cupcake-id=${cupcake.id}>
        <li>
            ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
            <button class="delete-button">X</button>
        </li>
        <img class="Cupcake-img" src="${cupcake.image}"
    </div>
    `;
}

// put cupcakes from database on home page
async function getCupcakes(){
    const res = await axios.get(`${BASE_URL}/cupcakes`);
    for (let cupcakeData of res.data.cupcakes) {
        let newCupcake = $(generateCupcakeHTML(cupcakeData));
        $('.cupcake-list').append(newCupcake);
    }   
}

// add new cupcakes
$("#cupcake-form").on('submit', async function(e) {
    e.preventDefault();

    let flavor = $('#flavor').val();
    let size = $('#size').val();
    let rating = $('#rating').val();
    let image = $('#image').val();

    const cupcakeData = await axios.post(`${BASE_URL}/cupcakes`, {
        flavor, size, rating, image
    });

    let newCupcake = $(generateCupcakeHTML(cupcakeData.data.cupcake));
    $('.cupcake-list').append(newCupcake);
    $("#cupcake-form").trigger('reset');
})

$('.cupcake-list').on('click', '.delete-button', async function(e) {
    e.preventDefault();
    let $cupcake = $(e.target).closest('div');
    let cupcakeId = $cupcake.attr('data-cupcake-id');

    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`)
    $cupcake.remove()
})

$(getCupcakes);