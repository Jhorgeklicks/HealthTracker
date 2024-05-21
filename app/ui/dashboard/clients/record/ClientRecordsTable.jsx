"use client"
import styles from './clientRecordTable.module.css';
import { healthQuestionnaire} from '@/app/questionnaire';
import Link from 'next/link';
import Controls from '../controls/Controls';
import { useState } from 'react';

function formatCreatedAtDate(createdAt) {
    if(createdAt === undefined){
        return
    }

    const date = new Date(createdAt);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();
    return `${day}, ${dayOfMonth} ${month} ${year}`;
 }

const ClientRecordsTable = ({staff, data, length}) => {
    const [current, setCurrent] = useState(0)

    // console.log(formatCreatedAtDate(data?.height))


    const visitation = (num) => {
        let suffix;
        switch (num % 10) {
          case 1:
            suffix = "st";
            break;
          case 2:
            suffix = "nd";
            break;
          case 3:
            suffix = "rd";
            break;
          default:
            suffix = "th";
        }
         return(`${num}${suffix}`)
         
        }
    

    const updateCurrent = (newVal) => {
        setCurrent(newVal);
    }

    let visitationCount = visitation(1 + current*1);

    
  return (
    <div className={styles.container}>
        <Link href={`/dashboard/clients/new/${data[current]?.PatientId?._id}`} className={styles.addNew}>Add New Data</Link>

        <h2 className={styles.headline}>Information on {`${data[current]?.PatientId?.firstName} ${data[current]?.PatientId?.middleName == null ? '' : data[current]?.PatientId?.middleName} ${data[current]?.PatientId?.lastName}`}</h2>

       <Controls length={length} current={current} updateCurrent={updateCurrent} facility={data[current]?.staffId?.name}/>

        <div className={styles.wrapper}>
        <div className={`${styles.col1} ${styles.TopLeftBorder} ${styles.rightBorder}`}>
                <h3 className={styles.textHead}>Background data</h3>

                {
                    data[current]?.PatientId?.Officer.toString() === staff && <div className={styles.linkBox}><Link className={styles.update} href={`/dashboard/clients/update/info/${data[current]?.PatientId?._id}`}>Update Info</Link></div>
                }
                
        </div>
            <div className={styles.col1}>
                <div className={`${styles.colBox} ${styles.TopLeftBorder}`}>
                    <h4 className={styles.title}>Name</h4>
                    <p className={styles.text}>{`${data[0]?.PatientId?.firstName} ${data[0]?.PatientId?.middleName == null ? '' : data[0]?.PatientId?.middleName} ${data[0]?.PatientId?.lastName}`}</p>
                </div>
                <div className={`${styles.colBox} ${styles.TopLeftBorder}`}>
                    <h4 className={styles.title}>Age</h4>
                    <p className={styles.text}>{`${data[current]?.PatientId?.age} years`}</p>
                </div>
                <div className={`${styles.colBox} ${styles.TopLeftBorder} ${styles.rightBorder}`}>
                    <h4 className={styles.title}>Phone</h4>
                    <p className={styles.text}>{`${data[current]?.PatientId?.phone == null ? '--' : data[current]?.PatientId?.phone}`}</p>
                </div>
            </div>
            
            <div className={styles.col1}>
                <div className={`${styles.colBox} ${styles.BottomLeftBorder} ${styles.OnlyTopBorder}`}>
                    <h4 className={styles.title}>Gender</h4>
                    <p className={styles.text}>{`${data[current]?.PatientId?.gender}`}</p>
                </div>
                <div className={`${styles.colBox} ${styles.BottomLeftBorder} ${styles.OnlyTopBorder}`}>
                    <h4 className={styles.title}>Marital Status</h4>
                    <p className={styles.text}>{`${data[current]?.PatientId?.maritalStatus === true ? 'Married' : 'Single'}`}</p>
                </div>
                <div className={`${styles.colBox} ${styles.BottomLeftBorder} ${styles.OnlyTopBorder} ${styles.rightBorder}`}>
                    <h4 className={styles.title}>Educational level</h4>
                    <p className={styles.text}>{`${data[current]?.PatientId?.education}`}</p>
                </div>
            </div>
            <div className={`${styles.col1} ${styles.leftRightBorder}`}>
                <div className={styles.tableHealthInfo}>
                <h3 className={styles.textHead}>Health Information</h3>
                <span className={styles.dated}>
                    {`${data[current]?.healthData?.createdAt == undefined ? "Data not Recorded On first Visit" : visitationCount +" Visitation Recorded On "+ formatCreatedAtDate(data[current]?.healthData?.createdAt)  }`}
                </span>
                </div>
                {
                data[current]?.healthData?.staffId && data[current]?.healthData?.staffId?.toString() === staff && <div className={styles.linkBox}><Link className={styles.update} href={`/dashboard/clients/update/healthData/${data[current].healthData?._id}`}>Update Data</Link></div>
                }
              
            </div>
            <div className={styles.col1}>
                {/* height */}
                <div className={`${styles.colBox} ${styles.TopLeftBorder}`}>
                    <h4 className={styles.title}>Height</h4>
                    <p className={styles.text}>{`${data[current]?.healthData?.height} cm`}</p>
                </div>
                <div className={`${styles.colBox} ${styles.TopLeftBorder}`}>
                    <h4 className={styles.title}>Weight</h4>
                    <p className={styles.text}>{`${data[current]?.healthData?.weight} kg`}</p>
                </div>
                <div className={`${styles.colBox} ${styles.TopLeftBorder} ${styles.rightBorder}`}>
                    <h4 className={styles.title}>Bmi</h4>
                    <p className={styles.text}>{`${data[current]?.healthData?.bmi}`}</p>
                </div>
            </div>
            <div className={styles.col1}>
                 {/* systolicBp */}
                 <div className={`${styles.colBox} ${styles.TopLeftBorder}`}>
                    <h4 className={styles.title}>Systolic BP</h4>
                    <p className={styles.text}>{`${data[current]?.healthData?.systolicBp} mmHg`}</p>
                </div>
                <div className={`${styles.colBox} ${styles.TopLeftBorder}`}>
                    <h4 className={styles.title}>DiastolicBp</h4>
                    <p className={styles.text}>{`${data[current]?.healthData?.diastolicBp} mmHg`}</p>
                </div>
               <div className={`${styles.colBox} ${styles.TopLeftBorder} ${styles.rightBorder}`}>
                    <h4 className={styles.title}>FBS</h4>
                    <p className={styles.text}>{`${data[current]?.healthData?.fbs} mg/dL`}</p>
                </div>
            </div>
            <div className={styles.col1}>
                {/* rbs */}
                <div className={`${styles.colBox} ${styles.TopLeftBorder} ${styles.rightBorder}  ${styles.onlyBottomBorder}`}>
                    <h4 className={styles.title}>RBS</h4>
                    <p className={styles.text}>{`${data[current]?.healthData?.rbs} mg/dL`}</p>
                </div>
            </div>

            <div className={`${styles.col1} ${styles.leftRightBorder}`}>
                <h3 className={styles.textHead}>Response to Questionnaire</h3>
                {
                    staff === data[current]?.staffId?._id && <div className={styles.linkBox}><Link className={styles.update} href={`/dashboard/clients/update/qtns/${data[current]?._id}`}>Update Response</Link></div>
                }
                
            </div>
            {/* <hr className={styles.line}/> */}
            <div className={`${styles.colQuestions} ${styles.TopLeftBorder} ${styles.rightBorder}  ${styles.onlyBottomBorder}} `}>
                    {
                        healthQuestionnaire.map( qtn => 
                        <div key={qtn.id} className={`${styles.qtnBox} ${styles.onlyBottomBorder} }`}>
                            <div className={`${styles.title}`}>
                                <code>Q{qtn.id}</code> 
                                &nbsp;&nbsp;
                                <span>{qtn.qtn}</span>
                            </div>
                            {
                                // data
                            }
                            <p className={styles.text}>&#10230; {data[current][qtn.tag]}</p>
                        </div>
                        )
                    }
            </div>
        </div>
    </div>
  )
}

export default ClientRecordsTable