export default function RandomContent(params) {
  return (
    <div>
      <h1>Pros</h1>
      <ul>
        <li>Highly controllable/configurable with low-level-apis</li>
        <li>Convert from html</li>
      </ul>
      <h1>Cons</h1>
      <ul>
        <li>
          No mobile browser support
          (https://draftjs.org/docs/advanced-topics-issues-and-pitfalls#mobile-not-yet-supported)
        </li>
        <li>
          No default rich text config and controls, everything need to be setup
        </li>
        <li>No typescript</li>
        <li>No composable plugin systems only advanced low-level APIs</li>
        <li>Not maintained after August 2020</li>
      </ul>
    </div>
  );
}
