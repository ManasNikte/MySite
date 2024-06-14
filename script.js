
// Form validation
(function () {
    'use strict';
    window.addEventListener('load', function () {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

// Custom form validation example
$('#signupForm, #contactForm').on('submit', function (event) {
    event.preventDefault();
    var form = $(this);
    if (form[0].checkValidity() === false) {
        event.stopPropagation();
    } else {
        var spinner = '<div class="d-flex justify-content-center"><div class="spinner-border text-primary"></div></div>'; if (form.attr('id') === 'contactForm') {
            $('#contactFormContainer').html(spinner);
            setTimeout(function () {
                $('#contactFormContainer').html(`
                        <div class="alert alert-success">
                            <strong>Contact Form Submitted Successfully!</strong>
                        </div>
                    `);
            }, 2000);
        } else if (form.attr('id') === 'signupForm') {
            $('#signupFormContainer').html(spinner);
            setTimeout(function () {
                $('#signupFormContainer').html(`
                        <div class="alert alert-success">
                            <strong>Sign-up Form Submitted Successfully!</strong>
                        </div>
                    `);
            }, 2000);
        }
        form[0].reset();
        form.removeClass('was-validated');
    }
    form.addClass('was-validated');
});

$(document).ready(function () {
    // Employee data
    const employees = [
        { name: "John Doe", salary: "$25,000", age: 30 },
        { name: "Jane Smith", salary: "$35,000", age: 25 },
        { name: "Mary Johnson", salary: "$30,000", age: 28 },
        { name: "James Brown", salary: "$45,000", age: 40 },
        { name: "Patricia Taylor", salary: "$50,000", age: 35 },
        { name: "Robert Wilson", salary: "$40,000", age: 45 },
        { name: "Michael Moore", salary: "$55,000", age: 50 },
        { name: "Linda Anderson", salary: "$60,000", age: 55 },
        { name: "David Thomas", salary: "$65,000", age: 60 },
        { name: "Barbara Jackson", salary: "$70,000", age: 65 }
    ];

    const rowsPerPage = 3;
    let currentPage = 1;

    // Function to display data for a specific page
    function displayPage(page) {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedItems = employees.slice(start, end);

        $('#employeeTableBody').html('');
        paginatedItems.forEach(employee => {
            $('#employeeTableBody').append(`
                    <tr>
                        <td>${employee.name}</td>
                        <td>${employee.salary}</td>
                        <td>${employee.age}</td>
                    </tr>
                `);
        });

        updatePagination(page);
    }

    // Function to update pagination links
    function updatePagination(page) {
        $('#pagination').html(`
                <li class="page-item ${page === 1 ? 'disabled' : ''}">
                    <a class="page-link" href="#" id="prevPage" data-page="${page - 1}">&laquo;</a>
                </li>
                ${Array.from({ length: Math.ceil(employees.length / rowsPerPage) }, (_, i) => `
                    <li class="page-item ${i + 1 === page ? 'active' : ''}">
                        <a class="page-link" href="#" data-page="${i + 1}">${i + 1}</a>
                    </li>
                `).join('')}
                <li class="page-item ${page === Math.ceil(employees.length / rowsPerPage) ? 'disabled' : ''}">
                    <a class="page-link" href="#" id="nextPage" data-page="${page + 1}">&raquo;</a>
                </li>
            `);
    }

    // Initial display of data when page loads
    displayPage(currentPage);

    // Fetch data button click event
    $('#fetchDataButton').click(function () {
        $('#employeeTableContainer').slideDown(500, function () {
            displayPage(1);
        });
    });

    // Pagination click event
    $(document).on('click', '.page-link', function (e) {
        e.preventDefault();
        const page = $(this).data('page');
        if (page >= 1 && page <= Math.ceil(employees.length / rowsPerPage)) {
            currentPage = page;
            displayPage(currentPage);
        }
    });

    // Search functionality
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        displayFilteredResults(value);
    });

    // Function to filter and display data based on search input
    function displayFilteredResults(filterValue) {
        const filteredEmployees = employees.filter(employee => {
            return employee.name.toLowerCase().includes(filterValue);
        });

        $('#employeeTableBody').html('');
        filteredEmployees.forEach(employee => {
            $('#employeeTableBody').append(`
                    <tr>
                        <td>${employee.name}</td>
                        <td>${employee.salary}</td>
                        <td>${employee.age}</td>
                    </tr>
                `);
        });

        // Update pagination for filtered results
        updatePagination(1); // Reset pagination to first page
    }
});
