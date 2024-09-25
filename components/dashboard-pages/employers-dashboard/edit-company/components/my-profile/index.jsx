import FormInfoBox from "./FormInfoBox";
import LogoCoverUploader from "./LogoCoverUploader";

const index = ({ id }) => {
    return (
        <div className="widget-content">
            {/* <LogoCoverUploader /> */}
            {/* End logo and cover photo components */}

            <FormInfoBox id={id} />
            {/* compnay info box */}
        </div>
    );
};

export default index;
