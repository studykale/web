<template>
  <div>
      <div class="notification-card">
          <div class="content">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas expedita quam praesentium sit ea ipsum id odit asperiores, sunt repudiandae?</p>
               <div class="actions">
                <button class="info">Mark as read</button>
                <button class="danger">Delete</button>
               </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .notification-card {
        max-width: 350px;
        padding: 1em;
        background: white;
        border-radius: 4px;
        margin-top: 1em;

        .content p {
            font-size: .85rem;
        }

        .actions {
            margin-top: 1.5em;
        }
        .actions  button {
            border: none;
            padding: .5em;
            margin-right: 10px;
            border-radius: 2px;
            color: white;

            &.info {
                background: #1EC9E8;
            }

            &.danger {
                background: #FF005C;
            }
        }
    }
</style>