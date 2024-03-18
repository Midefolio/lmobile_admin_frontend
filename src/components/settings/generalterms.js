import { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import useUtils from '../../utils/useUtils';
import useApi from '../../hooks/useApi';
const GeneralTerms = ({setting, getSettings, setGeneral}) => {
  const token = localStorage.getItem('lmobileToken');
  const {setToast, isPending} = useUtils();
  const {requestMaker} = useApi();
  const [params, setParams] = useState({
    terms:"",
    token,
    action:"update_general_terms"
  }) 

  useEffect(() => {
   setParams((prev) => ({...prev, terms:setting?.general_terms}))
  }, [setting])

   const editorRef = useRef(null);
  //   const log = () => {
  //   if (editorRef.current) {
  //     setParams((prev) => ({...prev, terms:editorRef.current.getContent()}))
  //     // console.log(editorRef.current.getContent());
  //   }
  // };

  const updateTerms = async (e) => {
    e.preventDefault();
    isPending('save_general', true);
    params['terms'] = editorRef.current.getContent();
    const res = await requestMaker('admin/setting', params);
    if(res?.status === 'successful') {
      await getSettings();
      setToast('Terms Updated Successfully');
      isPending('save_general', "Save and Publish");
    }else {
      // setToast('Terms Updated Successfully');
      isPending('save_general', "Save and Publish");
    }
  }

  return ( <>
  <>
   <div className="add-item-modal" onClick={()=> {setGeneral(false)}}>
    <div className="my-col-6 off-3 my-bottom-50 bg-white down-5 rad-10" onClick={(e) => {e.stopPropagation()}}>
      <div className="my-col-10 off-1 down-3 px13 bold bd-bottom"><span>General Terms</span></div>
      <div className="my-col-10 off-1 down-1">
        <form action="">
          <div className="mother">
           <div className="my-col-12">
            <Editor
              apiKey='your-api-key'
              onInit={(evt, editor) => editorRef.current = editor}
              initialValue={params?.terms}
              init={{
              height: 300,
              menubar: false,
             plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
               'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
             content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
           }}
           />
            </div>
            <button className="my-btn-sm bd-unset down-4 bg-color-code-1 px13 white" id='save_general' onClick={(e) => {updateTerms(e)}} >Save and Publish</button>
          </div>
        </form>
      </div>
    </div>
   </div>
  </>
  
  </> );
}
 
export default GeneralTerms;