// let roleList = [];
//
// function getAllUsers() {
//     $.getJSON('/admin/users', function (data) {
//         let rows = '';
//         $.each(data, function (key, user) {
//             rows += createRows(user);
//         });
//         $('#tableAllUsers').append(rows);
//         $.ajax({
//             url: '/admin/authorities',
//             method: 'GET',
//             dataType: 'json',
//             success: function (roles) {
//                 roleList = roles;
//             }
//         });
//     });
// }
//
// getAllUsers();
//
// function createRows(user) {
//     let userData = '<tr id=' + user.id + '>';
//     userData += '<td>' + user.id + '</td>';
//     userData += '<td>' + user.name + '</td>';
//     userData += '<td>' + user.surname + '</td>';
//     userData += '<td>' + user.age + '</td>';
//     userData += '<td>' + user.email + '</td>';
//     userData += '<td>';
//     let roles = user.authorities;
//     for (let role of roles) {
//         userData += role.name.replace('ROLE_', '') + ' ';
//     }
//     userData += '</td>' +
//         '<td>' + '<input id="btnEdit" value="Edit" type="button" ' +
//         'class="btn-info btn edit-btn" data-toggle="modal" data-target="#editModal" ' +
//         'data-id="' + user.id + '">' + '</td>' +
//         '<td>' + '<input id="btnDelete" value="Delete" type="button" class="btn btn-danger del-btn" ' +
//         'data-toggle="modal" data-target="#deleteModal" data-id=" ' + user.id + ' ">' + '</td>';
//     userData += '</tr>';
//     return userData;
// }
//
// function getUserRolesForEdit() {
//     var allRoles = [];
//     $.each($("select[name='editRoles'] option:selected"), function () {
//         var role = {};
//         role.id = $(this).attr('id');
//         role.name = $(this).attr('name');
//         allRoles.push(role);
//     });
//     return allRoles;
// }
//
// $(document).on('click', '.edit-btn', function () {
//     const userId = $(this).attr('data-id');
//     $.ajax({
//         url: '/admin/' + userId,
//         method: 'GET',
//         dataType: 'json',
//         success: function (user) {
//             $('#editId').val(user.id);
//             $('#editName').val(user.name);
//             $('#editSurname').val(user.surname);
//             $('#editAge').val(user.age);
//             $('#editEmail').val(user.email);
//             $('#editPassword').val(user.password);
//             $('#editRole').empty();
//             roleList.map(role => {
//                 let flag = user.authorities.find(item => item.id === role.id) ? 'selected' : '';
//                 $('#editRole').append('<option id="' + role.id + '" ' + flag + ' name="' + role.name + '" >' +
//                     role.name.replace('ROLE_', '') + '</option>')
//             })
//         }
//     });
// });
//
// $('#editButton').on('click', (e) => {
//     e.preventDefault();
//     let userEditId = $('#editId').val();
//     var editUser = {
//         id: $("input[name='id']").val(),
//         name: $("input[name='name']").val(),
//         surname: $("input[name='surname']").val(),
//         age: $("input[name='age']").val(),
//         email: $("input[name='email']").val(),
//         password: $("input[name='password']").val(),
//         roles: getUserRolesForEdit()
//     }
//     $.ajax({
//         url: '/admin',
//         method: 'PUT',
//         contentType: 'application/json; charset=utf-8',
//         dataType: 'json',
//         data: JSON.stringify(editUser),
//         success: (data) => {
//             let newRow = createRows(data);
//             $('#tableAllUsers').find('#' + userEditId).replaceWith(newRow);
//             $('#editModal').modal('hide');
//             $('#admin-tab').tab('show');
//         },
//         error: () => {
//             console.log("error editUser")
//         }
//     });
// });
//
// $(document).on('click', '.del-btn', function () {
//     let userId = $(this).attr('data-id');
//     $.ajax({
//         url: '/admin/' + userId,
//         method: 'GET',
//         dataType: 'json',
//         success: function (user) {
//             $('#delId').empty().val(user.id);
//             $('#delName').empty().val(user.name);
//             $('#delSurname').empty().val(user.surname);
//             $('#delAge').empty().val(user.age);
//             $('#delEmail').empty().val(user.email);
//             $('#delPassword').empty().val(user.password);
//             $('#delRole').empty();
//             roleList.map(role => {
//                 let flag = user.authorities.find(item => item.id === role.id) ? 'selected' : '';
//                 $('#delRole').append('<option id="' + role.id + '" ' + flag + ' name="' + role.name + '" >' +
//                     role.name.replace('ROLE_', '') + '</option>')
//             })
//         }
//     });
// });
//
// $('#deleteButton').on('click', (e) => {
//     e.preventDefault();
//     let userId = $('#delId').val();
//     $.ajax({
//         url: '/admin/' + userId,
//         method: 'DELETE',
//         success: function () {
//             $('#' + userId).remove();
//             $('#deleteModal').modal('hide');
//             $('#admin-tab').tab('show');
//         },
//         error: () => {
//             console.log("error delete user")
//         }
//     });
// });
//
// function getUserRolesForAdd() {
//     var allRoles = [];
//     $.each($("select[name='addRoles'] option:selected"), function () {
//         var role = {};
//         role.id = $(this).attr('id');
//         role.name = $(this).attr('name');
//         allRoles.push(role);
//     });
//     return allRoles;
// }
//
// $('.newUser').on('click', () => {
//     $('#name').empty().val('')
//     $('#surname').empty().val('')
//     $('#age').empty().val('')
//     $('#email').empty().val('')
//     $('#password').empty().val('')
//     $('#addRole').empty().val('')
//     roleList.map(role => {
//         $('#addRole').append('<option id="' + role.id + '" name="' + role.name + '">' +
//             role.name.replace('ROLE_', '') + '</option>')
//     })
// })
//
// $("#addNewUserButton").on('click', () => {
//     let newUser = {
//         name: $('#name').val(),
//         surname: $('#surname').val(),
//         age: $('#age').val(),
//         email: $('#email').val(),
//         password: $('#password').val(),
//         roles: getUserRolesForAdd()
//     }
//     $.ajax({
//         url: '/admin',
//         method: 'POST',
//         dataType: 'json',
//         data: JSON.stringify(newUser),
//         contentType: 'application/json; charset=utf-8',
//         success: function () {
//             $('#tableAllUsers').empty();
//             getAllUsers();
//             $('#admin-tab').tab('show');
//         },
//         error: function () {
//             alert('error addUser')
//         }
//     });
// });


// ------------------------------------------------------------------------------------------------------------

function userRoles(array) {
    let string = "";
    const length = array.length;
    for (let index = 0; index < length; index++) {
        string = string + " " + array[index].name;
    }
    return string;
}

$(document).ready(function () {
    loadTable();
})

function loadTable() {

    $.ajax("/api/users", {
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
    user.roles = $("#roles1").val(),
        $.ajax("/api/users", {
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
        url: "/api/users/" + user_id,
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
            $("#roles1:selected").val(user.roles);
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
        url: "/api/users/" + user_id,
        dataType: 'json',
        timeout: 100000,
        success: function (data) {
            console.log("SUCCESS: ", data);
            var user = JSON.parse(JSON.stringify(data));
            $("#name2").val(user.name);
            $("#surname2").val(user.surname);
            $("#age2").val(user.age);
            $("#email2").val(user.email);
            $("#password1").val(user.password);
            $("#roles2").val(user.role);
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
    $.ajax("/api/users", {
        method: "post",
        contentType: "application/json",
        data: JSON.stringify(
            {
                name: $("#inputName").val(),
                surname: $("#inputSurname").val(),
                age: $("#inputAge").val(),
                email: $("#inputEmail").val(),
                password: $("#inputPassword").val(),
                roles: $("#roles").val()
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
        url: "/api/users/" + $("#deleteId").val(),
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
        userData += role.name.replace('ROLE_', '') + ' ';
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





