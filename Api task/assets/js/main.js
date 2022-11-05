$.ajax({
	type: "GET",
	url: `http://103.88.221.150:9439/api/bank/getAll`,
	responseType: "json",
	success: function (response) {
        console.log("api data=>", response);

        $.each(response, function (index, value) { 
            console.log("loop=>" , value);
            $("#bank-data tbody").append(`
            <tr>
                <td>${value.bankId}</td>
                <td>${value.bankName}</td>
                <td>${value.accountNumber}</td>
                <td>${value.ifscCode}</td>
                <td>${value.ipAddress}</td>
                <td><span class="badge text-bg-${value.activeStatus?'success':'danger'}">${value.activeStatus}</span>
                </td>
                <td><span class="badge text-bg-success">${value.deletedStatus}</span>
                </td>
                <td><div class="form-check form-switch">
                <input class="form-check-input" onclick="action(${value.bankId})" type="checkbox" role="switch" id="toggle-one">
                
              </div></td>
                <td> <button type="button" onclick="edit(${value.bankId})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal">
                Edit Bank
                </button></td>
                <td><button class="btn btn-danger" onclick="Del(${value.bankId})">delete</button></td> 
            </tr>            
            `);
             
        });
	},
    complete:function(){
        $("#bank-data").DataTable();
    }
    
	
})

function getBankData() {

    
}

function edit(id){
    console.log("editId", id);

    $.ajax({
        type: "GET",
        url: `http://103.88.221.150:9439/api/bank/${id}`,
        data: "data",
        dataType: "json",
        success: function (response) {
            console.log("editresponse======>", response);
             $("#editAccount").val(response.accountNumber)
             $("#editBankName").val(response.bankName)
             $("#editifscCode").val(response.ifscCode)
        }                                   
    });
    $("#updateBank").click(function (e) { 
        e.preventDefault();
        $.ajax({
            type: "PUT",
            url:`http://103.88.221.150:9439/api/bank/${id}`,
            dataType: "json",
            contentType: 'application/json',
            data: JSON.stringify(
            {
                "accountNumber": $("#editAccount").val(),
                "ifscCode":$("#editifscCode").val(),
                "bankName":$("#editBankName").val(),
                "createdId":2,
                "createdBy":"admin"
    
            }),
            success: function (response) {
                console.log("UpdateBankDetails=======>>",response);
                swal({title: "Bank Updates", text: "Done!", type: "success"},)
                .then(function(){
                location.reload();
            }
                );
            
        
            }
        });
        
    });
}
// update ///// 





$("#btn-post").click(function (e) { 
    e.preventDefault();
    $.ajax({
        type: "POST",
        url:`http://103.88.221.150:9439/api/bank`,
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(
        {
            "accountNumber": $("#exampleInputEmail1").val(),
            "ifscCode":$("#exampleInputPassword1").val(),
            "bankName":$("#exampleInputEmail2").val(),
            "createdId":2,
            "createdBy":"admin"

        }),
        success: function (response) {
            console.log("resp",response);
            swal({title: "New Bank Added", text: "Successfully", type: "success"},)
                .then(function(){
                location.reload();
            }
                );
        }
    });
    
});


function Del(id){
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "PUT",
                url: `http://103.88.221.150:9439/api/bank/${id}/deleteById`,
                dataType: "json",
                contentType: 'application/json',
                data: JSON.stringify(
                    {
                        "status":false,
                        "userId":2,
                        "userName": "test Admin"
                    }
                ),
                success: function (response) {
                    console.log(response);
                    swal({title: "Delete", text: "You clicked the button!", type: "success"},)
                    .then(function(){
                    location.reload();
                }
                    )
                    
                },
            });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
      
    
}
$(function() {
    $('#toggle-one').bootstrapToggle({
        on: 'Enabled',
        off: 'Disabled'
    });
    console.log("toggel", bootstrapToggle);
})
function action(id){
    console.log("action=>",id);
    $.ajax({
        type: "PUT",
        url: `http://103.88.221.150:9439/api/bank/${id}/activeStatus`,
        dataType: "json",
        contentType: application/json,
        data: "data",
        success: function (response) {
            
        }
    });
}



