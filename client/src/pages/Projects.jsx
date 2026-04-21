import CallToAction from '../components/CallToAction';

export default function Projects() {
  return (
    <div className="min-h-screen max-w-3xl mx-auto flex justify-center items-center flex-col p-3 gap-8">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="text-xl text-gray-500">
        Build fun and engaging projects while learning web design and
        development.
      </p>
      <CallToAction />
    </div>
  );
}
