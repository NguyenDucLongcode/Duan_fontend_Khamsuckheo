import ComponentSection from "../../Component/ComponentSection";
import { useGetTopDoctorQuery } from "../../redux/SliceApi/doctorApiSlice";

const OutStandingDoctor = () => {
  const { data, error, isLoading } = useGetTopDoctorQuery(12);
  const OutstandingDoctor = "OutstandingDoctor";

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred!</p>;

  return (
    <>
      <ComponentSection
        OutstandingDoctor={OutstandingDoctor}
        dataTopDoctor={data}
      />
    </>
  );
};
export default OutStandingDoctor;
