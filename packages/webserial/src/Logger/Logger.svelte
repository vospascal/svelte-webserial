<script>
    import {getContext, onMount, afterUpdate, onDestroy} from 'svelte';
    import {interval, map, sample} from "rxjs";

    let connected = getContext('WSC-connected');
    let {stream} = getContext('WSC-actions');

    $: list = [];
    let getStream = null;

    const handleChecked = async () => {
        if ($connected) {
            getStream = await stream();
            getStream
                .pipe(sample(interval(0)))
                .subscribe({
                    next: (message) => {
                        if (list.length >= 10) {
                            list = [message, ...list].slice(0, -1)
                        } else {
                            list = [message, ...list]
                        }
                    },
                    complete: () => {
                        console.log("[readLoop] DONE");
                    },
                })
        }
    }

    $: {
        $connected, handleChecked()
    }

    onDestroy(async () => {
        getStream.unsubscribe();
    });

</script>
<div>
    <pre>{JSON.stringify(list, null, 2)}</pre>
</div>