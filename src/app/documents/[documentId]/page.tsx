import React from "react";

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;

  return <div>DocumentID: {documentId}</div>;
};

export default DocumentIdPage;
