import oracledb

DB_CONFIG = {
    "user": "project",
    "password": "1234",
    "dsn": "210.119.12.109:1521/xe"
}

def get_connection():
    return oracledb.connect(**DB_CONFIG)

def save_prediction(mem_id, features, result):
    conn = get_connection()
    try:
        cursor = conn.cursor()
        sql = """
                INSERT INTO data_test (
                    mem_id, check_date,
                    di1_dg, di2_dg, de1_dg, di3_dg, he_hp, he_glu, he_hba1c, he_chol,
                    he_tg, he_bmi, he_wc, bs1_1, bd1_11, bd2_1, be8_1, pa_aerobic,
                    sex, age, edu, incm,
                    predict
                ) VALUES (
                    :1, SYSDATE,
                    :2, :3, :4, :5, :6, :7, :8, :9,
                    :10, :11, :12, :13, :14, :15, :16, :17,
                    :18, :19, :20, :21,
                    :22
                )
            """
        params = [mem_id] + features + [result]
        cursor.execute(sql, params)
        conn.commit()
        print("DB 저장 완료")

    except Exception as e:
        conn.rollback()
        print(f"DB 저장 실패: {e}")
        raise e

    finally:
        cursor.close()
        conn.close()