import { createBindVariable, Vitess } from "../src";

async function main() {
  // Create the Vitess client
  const client = new Vitess({
    baseUrl: 'http://localhost:15991'
  });

  console.group("Starting transaction example using SQL statements");

  // Start a transaction with a BEGIN statement
  console.log("Starting transaction with BEGIN");
  const beginResult = await client.execute({
    query: {
      sql: "BEGIN",
    },
  });

  // Get the session from the result - this has transaction state
  const session = beginResult.session;

  if (!session) {
    throw new Error("Failed to get session from BEGIN statement");
  }

  console.log("Transaction started:", session.inTransaction);

  try {
    // Execute first statement in transaction
    console.log("Executing first statement in transaction");
    const result1 = await client.execute({
      session, // Pass the session to continue the transaction
      query: {
        sql: "INSERT INTO customer (name, email) VALUES (:name, :email)",
        bindVariables: {
          name: createBindVariable("John Doe"),
          email: createBindVariable("john.doe@example.com")
        }
      }
    });

    // Show results of first statement
    console.log("Insert result:");
    console.log("Rows affected:", result1.rowsAffected);
    console.log("Last insert ID:", result1.insertId);
    console.groupEnd();

    // Execute second statement in the same transaction
    console.group("Executing second statement in transaction");
    const result2 = await client.execute({
      session: result1.session, // Use the updated session from previous query
      query: {
        sql: "SELECT * FROM customer WHERE email = :email",
        bindVariables: {
          email: createBindVariable("john.doe@example.com")
        }
      }
    });

    // Show results of second statement
    console.log("Select result:");
    console.log("Row count:", result2.rows.length);
    console.groupEnd();

    // Commit the transaction with a COMMIT statement
    console.group("Committing transaction with COMMIT");
    await client.execute({
      session: result2.session, // Use the updated session from previous query
      query: {
        sql: "COMMIT",
      }
    });

    console.log("Transaction committed successfully");
    console.groupEnd();

  } catch (error) {
    // If there's an error, rollback the transaction
    console.group("Rolling back transaction with ROLLBACK");
    console.error("Error in transaction:", error);

    await client.execute({
      session,
      query: {
        sql: "ROLLBACK"
      }
    });

    console.log("Transaction rolled back");
    console.groupEnd();
  }
}

main().catch(console.error);