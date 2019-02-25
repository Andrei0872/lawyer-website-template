(function () {

    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const services = ['Service 1', 'Service 2', 'Service 3', 'Service 4', 'Service 5'];
    const error_msgs = [...$$(".error")];
    const constraints = {
        email: {
            presence: {
                allowEmpty: false,
                message: "Email field is mandatory!"
            },
            email: {
                message: "Please use a valid email address!"
            }
        },
        message: {
            presence: {
                allowEmpty: false,
                message: "Message field is mandatory!"
            }
        },
        service: {
            presence: {
                allowEmpty: false,
                message: "Service field is mandatory!"
            }
        },
        name: {
            presence: {
                allowEmpty: false,
                message: "Name field is mandatory!"
            }
        },
        phone: {
            presence: {
                allowEmpty: false,
                message: "Phone field is mandatory!"
            },
            format: {
                pattern: "(\\+4)?(07)(\\d{8})", // Romania
                message: "Please use a valid phone number!"
            }

        },
    }

    const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (window.innerWidth < 812) {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    $(".form").addEventListener('submit', sendEmail);
    $(".one_more").addEventListener('click', showForm);
    $(".map").addEventListener('click', mapHandler);

    function mapHandler(ev) {
        // When the user clicks on the map
        window.open("https://dummyimage.com/1000x800/000/f5f5f5&text=map+image");
    }

    function showForm(ev) {
        ev.preventDefault();
        $(".form").classList.remove('formSent');
    }

    function sendEmail(e) {
        e.preventDefault();
        clearErrors();
        const data = {}

        for ([key, value] of new FormData(this))
            data[key] = value;


        const errors = validate(data, constraints);

        if (errors) {

            error_msgs.forEach((err, index) => {
                const field = err.dataset.field;

                if (errors[field]) {
                    const errMessage = errors[field][0].slice(field.length + 1)

                    err.classList.remove("hide");
                    err.textContent = errMessage;
                }
            })

            return;
        }

        clearErrors();

        setTimeout(() => {
            $("input[name='email']").value = '';
            $("input[name='name']").value = '';
            $("input[name='phone']").value = '';
            $("select[name='service']").value = 0;
            $("textarea[name='message']").value = '';
        }, 500)

        data.service = services[data.service];

        /* 
        Here you could send the email.
        fetch(...)
            .then(res => res.json())
            .then(res => { this.classList.add('formSent') })
        */

        this.classList.add('formSent');
    }

    function clearErrors () {
        error_msgs.forEach(err => err.classList.add("hide"));
    }   

})();