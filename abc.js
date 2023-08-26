import pymysql
import snowflake.connector
import pandas as pd

# Connect to MariaDB
maria_connection = pymysql.connect(
    host='maria_host',
    user='maria_user',
    password='maria_password',
    db='company'
)

# Query and fetch data from MariaDB
maria_query = "SELECT * FROM employees"
maria_df = pd.read_sql(maria_query, maria_connection)

# Close MariaDB connection
maria_connection.close()

# Connect to Snowflake
snowflake_conn = snowflake.connector.connect(
    user='snowflake_user',
    password='snowflake_password',
    account='snowflake_account',
    warehouse='snowflake_warehouse',
    database='snowflake_database',
    schema='snowflake_schema'
)

# Query and fetch data from Snowflake
snowflake_query = "SELECT * FROM employees"
snowflake_cursor = snowflake_conn.cursor()
snowflake_cursor.execute(snowflake_query)
snowflake_df = snowflake_cursor.fetch_pandas_all()

# Close Snowflake connection
snowflake_cursor.close()
snowflake_conn.close()

# Perform Quality Check
def perform_quality_check(df1, df2):
    if df1.shape != df2.shape:
        return "Row count mismatch"
    
    if list(df1.columns) != list(df2.columns):
        return "Column names mismatch"
    
    if not df1.dtypes.equals(df2.dtypes):
        return "Data types mismatch"
    
    return "Data quality check passed"

result = perform_quality_check(maria_df, snowflake_df)
print(result)
