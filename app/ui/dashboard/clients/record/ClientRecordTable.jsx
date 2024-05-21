import styles from './clientRecordTable.module.css';
import { healthQuestionnaire} from '@/app/questionnaire';
import Link from 'next/link';


const ClientRecordTable = ({staff, data}) => {


  return (
    <div className={styles.container}>
         <Link href={`/dashboard/clients/new/${data?._id}`} className={styles.addNew}>Add New Data</Link>
        <h2 className={styles.headline}>Information on {`${data?.firstName} ${data?.middleName == null ? '' : data?.middleName} ${data?.lastName}`}</h2>

        <div className={styles.wrapper}>
        <div className={styles.col1}>
                <h3 className={styles.textHead}>Background data</h3>

                {
                    data?.Officer.toString() === staff && <Link className={styles.update} href={`/dashboard/clients/update/info/${data?._id}`}>Update Info</Link>
                }
                
        </div>
            <div className={styles.col1}>
                <div className={styles.colBox}>
                    <h4 className={styles.title}>Name</h4>
                    <p className={styles.text}>{`${data?.firstName} ${data?.middleName == null ? '' : data?.middleName} ${data?.lastName}`}</p>
                </div>
                <div className={styles.colBox}>
                    <h4 className={styles.title}>Age</h4>
                    <p className={styles.text}>{`${data?.age} years`}</p>
                </div>
                <div className={styles.colBox}>
                    <h4 className={styles.title}>Phone</h4>
                    <p className={styles.text}>{`${data?.phone == null ? '--' : data?.phone}`}</p>
                </div>
            </div>
            
            <div className={styles.col1}>
                <div className={styles.colBox}>
                    <h4 className={styles.title}>Gender</h4>
                    <p className={styles.text}>{`${data?.gender}`}</p>
                </div>
                <div className={styles.colBox}>
                    <h4 className={styles.title}>Marital Status</h4>
                    <p className={styles.text}>{`${data?.maritalStatus === true ? 'Married' : 'Single'}`}</p>
                </div>
                <div className={styles.colBox}>
                    <h4 className={styles.title}>Educational level</h4>
                    <p className={styles.text}>{`${data?.education}`}</p>
                </div>
            </div>
            <div className={styles.col1}>
                <h3 className={styles.textHead}>Health Information</h3>
                {
                data?.healthData?.staffId?.toString() === staff && <Link className={styles.update} href={`/dashboard/clients/update/healthData/${data.healthData?.id}`}>Update Data</Link>
                }
              
            </div>
            <div className={styles.col1}>
                {/* height */}
                <div className={styles.colBox}>
                    <h4 className={styles.title}>Height</h4>
                    <p className={styles.text}>{`${data?.healthData?.height === undefined ? 'null' : data?.healthData?.height +' cm'}`}</p>
                </div>
                <div className={styles.colBox}>
                    <h4 className={styles.title}>Weight</h4>
                    <p className={styles.text}>{`${data?.healthData?.weight === undefined ? 'null' : data?.healthData?.weight +' kg'}`}</p>
                </div>
                <div className={styles.colBox}>
                    <h4 className={styles.title}>Bmi</h4>
                    <p className={styles.text}>{`${data?.healthData?.bmi  === undefined ? 'null' : data?.healthData?.bmi}`}</p>
                </div>
            </div>

            <div className={styles.col1}>
                 {/* systolicBp */}
                 <div className={styles.colBox}>
                    <h4 className={styles.title}>Systolic BP</h4>
                    <p className={styles.text}>{`${data?.healthData?.systolicBp === undefined ? 'null' : data?.healthData?.systolicBp +' mmHg'}`}</p>
                </div>
                
                <div className={styles.colBox}>
                    <h4 className={styles.title}>DiastolicBp (DPB)</h4>
                    <p className={styles.text}>{`${data?.healthData?.diastolicBp === undefined ? 'null' : data?.healthData?.diastolicBp +' mmHg'}`}</p>
                </div>
                <div className={styles.colBox}>
                    <h4 className={styles.title}>FBS</h4>
                    <p className={styles.text}>{`${data?.healthData?.fbs === undefined ? 'null' : data?.healthData?.fbs +' mmHg'}`}</p>
                </div>
            </div>
            <div className={styles.col1}>
                {/* rbs */}
                <div className={styles.colBox}>
                    <h4 className={styles.title}>RBS</h4>
                    <p className={styles.text}>{`${data?.healthData?.rbs === undefined ? 'null' : data?.healthData?.rbs +' mmHg'}`}</p>
                </div>
            </div>

            <div className={styles.col1}>
                <h3 className={styles.textHead}>Response to Questionnaire</h3>
                {
                    staff === data?.staffId?.id && <Link className={styles.update} href={`/dashboard/clients/update/qtns/${data?.id}`}>Update Response</Link>
                }
                
            </div>
            <hr className={styles.line}/>
            <div className={styles.colQuestions}>
                    {
                        healthQuestionnaire.map( qtn => 
                        <div key={qtn.id} className={`{styles.colBox} ${qtn.id % 2 === 1 && styles.break }`}>
                            <div className={`${styles.title}`}>
                                <code>Q{qtn.id}</code> 
                                &nbsp;&nbsp;
                                <span>{qtn.qtn}</span>
                            </div>
                            <p className={styles.text}>not answered</p>
                        </div>
                        )
                    }
            </div>
        </div>
    </div>
  )
}

export default ClientRecordTable