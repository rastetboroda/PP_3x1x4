let roleList = [];

function userRoles(array) {
    let string = "";
    const length = array.length;
    for (let index = 0; index < length; index++) {
        string = string + " " + array[index].role;
    }
    return string;
}


function getAllRoles(){
    fetch("/roles")
        .then(res => res.json())
        .then(roles => {
            let temp = '';
            Array.from(roles).forEach(function (role){
                temp +=`
                <option value = "${role.id}">${role.role}<option>
                `
            });
            document.getElementById("addRoles").innerHTML = temp;
            document.getElementById("editRoles").innerHTML = temp;
            document.getElementById("delRoles").innerHTML = temp;

        });
}
getAllRoles()

$(document).ready(function () {
    loadTable();
})

function loadTable() {

    $.ajax("/users", {
        method: "GET",
        dataType: "json",
        success: function (msg) {
            $("#allUsers").children().remove();
            msg.forEach(function (user) {
                $("#allUsers").append(
                    '<tr id=' + user.id + '>' +
                    '<td>' + user.id + '</td>' +
                    '<td>' + user.name + '</td>' +
                    '<td>' + user.surname + '</td>' +
                    '<td>' + user.age + '</td>' +
                    '<td>' + user.email + '</td>' +
                    '<td>' + userRoles(user.roles) + '</td>' +
                    '<td>' + '<button type="button" name="buttonEdit" id="edit" onclick="userForEdit(this)" data-target="#editModal" value=' + user.id + ' ' +
                    'class="btn btn-info" data-toggle="modal">' + 'Edit' + '</button>' + '</td>' +
                    '<td>' + '<button type="button" name="buttonDelete" onclick="userForDelete(this)" data-target="#deleteModal" value=' + user.id + ' ' +
                    ' class="btn btn-danger" data-toggle="modal">' +
                    'Delete' + '</button>' + '</td>' +
                    '</tr>');
            });
        }
    })
}


function editUser() {
    let userEditId = $('#editId').val();
    var user = new Object();
    user.name = $("#name").val();
    user.surname = $("#surname").val();
    user.age = $("#age").val();
    user.email = $("#email").val();
    user.password = $("#password").val();
    user.id = $("#editId").val();
    user.roles = getRoles(Array.from(document.getElementById('editRoles').selectedOptions))
        $.ajax("/users", {
            method: "PUT",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(user),

            success: (data) => {
                console.log("SUCCESS: ", data);
                let newRow = createRows(data);
                $('#allUsers').find('#' + userEditId).replaceWith(newRow);
                $('#editModal').modal('hide');
                $('#admin-tab').tab('show');
            },

            // Неверный код, оставляю себе для примера:
            // success: function (data) {
            //     console.log("SUCCESS: ", data);
            //     loadTable();
            //     $(".modal").modal('hide');
            // },
            error: function (e) {
                console.log("ERROR: ", e);
            },
            done: function (e) {
                console.log("DONE");
            }
        })
}

function userForEdit(obj) {
    let user_id = obj.value
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/users/" + user_id,
        dataType: 'json',
        timeout: 100000,
        success: function (data) {
            console.log("SUCCESS: ", data);
            var user = JSON.parse(JSON.stringify(data));
            $("#name").val(user.name);
            $("#surname").val(user.surname);
            $("#age").val(user.age);
            $("#email").val(user.email);
            $("#password").val(user.password);
            $("#editRoles:selected").val(user.roles);
            $("#editId").val(user.id);
            $("#editButton").val(user.id);
        },
        error: function (e) {
            console.log("ERROR: ", e);
        },
        done: function (e) {
            console.log("DONE");
        }
    });
}

function userForDelete(obj) {
    let user_id = obj.value
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "users/" + user_id,
        dataType: 'json',
        timeout: 100000,
        success: function (data) {
            console.log("SUCCESS: ", data);
            var user = JSON.parse(JSON.stringify(data));
            $("#name2").val(user.name);
            $("#surname2").val(user.surname);
            $("#age2").val(user.age);
            $("#email2").val(user.email);
            $("#password2").val(user.password);
            $("#delRoles").val(user.role);
            $("#deleteId").val(user.id);
            $("#deleteButton").val(user.id);
        },
        error: function (e) {
            console.log("ERROR: ", e);
        },
        done: function (e) {
            console.log("DONE");
        }
    });
}


function addUser() {
    $.ajax("/users", {
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(
            {
                name: $("#inputName").val(),
                surname: $("#inputSurname").val(),
                age: $("#inputAge").val(),
                email: $("#inputEmail").val(),
                password: $("#inputPassword").val(),
                roles: getRoles(Array.from(document.getElementById('addRoles').selectedOptions))
            }),

        dataType: "json",

        success: function (data) {
            console.log("SUCCESS: ", data);
            loadTable();
            document.getElementById('addForm').reset();
        },
        error: function (e) {
            console.log("ERROR: ", e);
            $(".modal").modal('hide');
        },
        done: function (e) {
            console.log("DONE");
            $(".modal").modal('hide');
        }
    })
}

function deleteUser() {
    let userDeleteId = $('#deleteId').val();
    $.ajax({
        type: "DELETE",
        contentType: "application/json",
        url: "/users/" + $("#deleteId").val(),
        data: $("#deleteId").val(),
        dataType: 'json',
        timeout: 100000,

        success: function () {
            $('#' + userDeleteId).remove();
            $('#deleteModal').modal('hide');
            $('#admin-tab').tab('show');
        },
        // Неверный код, оставляю себе для примера:
        // success: function (data) {
        //     console.log("SUCCESS: ", data);
        //     $(".modal").modal('hide');
        //     loadTable();
        // },
        error: function (e) {
            console.log("ERROR: ", e);
        },
        done: function (e) {
            console.log("DONE");
        }
    });
}

function createRows(user) {
    let userData = '<tr id=' + user.id + '>';
    userData += '<td>' + user.id + '</td>';
    userData += '<td>' + user.name + '</td>';
    userData += '<td>' + user.surname + '</td>';
    userData += '<td>' + user.age + '</td>';
    userData += '<td>' + user.email + '</td>';
    userData += '<td>';
    let roles = user.authorities;
    for (let role of roles) {
        userData += role.role + ' ';
    }
    userData += '</td>' +
        '<td>' + '<input id="btnEdit" value="Edit" type="button" ' +
        'class="btn-info btn edit-btn" data-toggle="modal" data-target="#editModal" ' +
        'data-id="' + user.id + '">' + '</td>' +
        '<td>' + '<input id="btnDelete" value="Delete" type="button" class="btn btn-danger del-btn" ' +
        'data-toggle="modal" data-target="#deleteModal" data-id=" ' + user.id + ' ">' + '</td>';
    userData += '</tr>';
    return userData;
}

function getRoles(list) {
    let roles = [];
    list.forEach(o => {
        roles.push({"id": o.value, "role": o.text});
    });
    return roles;
}





