const fs = require("fs");
const readline = require("readline");

const file = "employees.json";

let employees = JSON.parse(fs.readFileSync(file));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function saveData() {
  fs.writeFileSync(file, JSON.stringify(employees, null, 2));
}

function menu() {
  console.log("\nEmployee Management System");
  console.log("1. Add Employee");
  console.log("2. View Employees");
  console.log("3. Update Employee");
  console.log("4. Delete Employee");
  console.log("5. Exit");

  rl.question("Choose option: ", choice => {

    if (choice == 1) addEmployee();
    else if (choice == 2) viewEmployees();
    else if (choice == 3) updateEmployee();
    else if (choice == 4) deleteEmployee();
    else if (choice == 5) rl.close();
    else {
      console.log("Invalid option");
      menu();
    }

  });
}

function addEmployee() {

  rl.question("Enter ID: ", id => {

    rl.question("Enter Name: ", name => {

      rl.question("Enter Salary: ", salary => {

        employees.push({ id, name, salary });

        saveData();

        console.log("Employee Added");

        menu();

      });

    });

  });

}

function viewEmployees() {

  console.table(employees);

  menu();

}

function updateEmployee() {

  rl.question("Enter ID to update: ", id => {

    let emp = employees.find(e => e.id == id);

    if (!emp) {
      console.log("Employee not found");
      return menu();
    }

    rl.question("New Name: ", name => {

      rl.question("New Salary: ", salary => {

        emp.name = name;
        emp.salary = salary;

        saveData();

        console.log("Employee Updated");

        menu();

      });

    });

  });

}

function deleteEmployee() {

  rl.question("Enter ID to delete: ", id => {

    employees = employees.filter(e => e.id != id);

    saveData();

    console.log("Employee Deleted");

    menu();

  });

}

menu();