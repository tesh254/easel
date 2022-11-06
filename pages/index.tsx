import dynamic from 'next/dynamic';

const EditorComponent = dynamic(() => import("../components/editor/index"));

const IndexPage = () => {
  return (
    <div className='w-screen h-screen'>
        <EditorComponent />      
    </div>
  );
};

export default IndexPage;
