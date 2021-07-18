<script>
    import Test from "./Test.svelte";
    import WebSerialContext from "./Services/WebSerialContext.svelte";
    import Logger from "./Logger/Logger.svelte";
    import Buttons from "./Buttons/Buttons.svelte";
    import Maps from "./Maps/Maps.svelte";
</script>

<WebSerialContext >
    <Buttons/>
    <Test>boxed content</Test>
    <Logger/>
    <Maps/>
</WebSerialContext>