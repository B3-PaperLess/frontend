<template>
  <div class="flex flex-col items-center">
    <div class="mt-4 w-fit">
      <img src="@/assets/image/logo.png" alt="logo" class="w-fit"/>
    </div>

    <div class="mt-12 flex flex-row justify-center gap-x-12">
      <card-home class="rounded-3xl text-center mx-48">
        <template v-slot:content>
          <div class="text-lg font-medium">
            Découvrez Paperless, la solution idéale pour dématérialiser facilement vos factures et vous conformer
            aux nouvelles exigences gouvernementales. En tant que service de dématérialisation officiel, nous vous offrons
            la possibilité de transmettre vos factures électroniquement aux autorités gouvernementales ou à d'autres tier,
            tout en assurant une vérification minutieuse et une réponse rapide.
          </div>
        </template>
      </card-home>
    </div>
    <div class="flex flex-row justify-arround mt-10">
      <card-home class="rounded-3xl text-center w-1/3 h-50 mx-2">
        <template v-slot:title>
          <div class="text-2xl font-medium">
            Etape 1
          </div>
        </template>

        <template v-slot:content>
          <div class="mt-6">
            Créer votre compte rien de plus simple !
          </div>

          <div>
            Il vous suffit de clicker ici.
          </div>
        </template>

        <template v-slot:button>
          <button-default class="w-1/2 mt-5" @click="$router.push({name: 'connexion'})">
              Créer un compte
          </button-default>
        </template>
      </card-home>
      <card-home class="rounded-3xl text-center w-1/3 h-50 mx-2">
        <template v-slot:title>
          <div class="text-2xl font-medium">
            Etape 2
          </div>
        </template>

        <template v-slot:content>
          <div class="mt-6">
            Votre compte dois être vérifié par un administrateur, vous recevrez un mail lors de la validation de votre compte.
          </div>
        </template>
      </card-home>

      <card-home class="rounded-3xl text-center w-1/3 h-50 mx-2">
        <template v-slot:title>
          <div class="text-2xl font-medium">
            Etape 3
          </div>
        </template>

        <template v-slot:content>
          <div class="mt-6">
            Envoyez vos factures en toute simplicité !
          </div>
        </template>

        <template v-slot:button>
          <button-default class="w-1/2 mt-5" @click="$router.push({name: 'connexion'})">
              Se connecter
          </button-default>
        </template>
      </card-home>
    </div>
  </div>
</template>

<script>
import CardHome from "@/components/cardHome.vue";
import ButtonDefault from "@/components/ButtonDefault.vue";

export default {
  name: "indexApp",
  components: {CardHome,ButtonDefault},
}
</script>

<style scoped>

</style>